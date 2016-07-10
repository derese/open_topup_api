import User from '../models/user';
import jwt from 'jwt-simple';
import moment from 'moment';
import {secret} from '../config.secret';
import {_error,mongooseErrorHelper} from '../helper/helpers';
import {formatResponse} from '../helper/messageFormat';
//var agenda = require('../worker');
import agenda from '../worker';





function tokenForUser(user)
{   
    let expiryDate = moment().add('hours',5).valueOf();    
    let issuedDate = moment().valueOf();
    return jwt.encode({sub:user.id,iat:issuedDate,exp:expiryDate},secret);
}


export function signin(req,res,next)
{
    //*** important user is already authed, by our middlewares
    // we just need to give them a token   
    
    res.status(200).send(formatResponse(false,null,{token:tokenForUser(req.user)}));
}

export function signup(req,res,next)
{
    
    let email = req.body.email;
    let password =  req.body.password;
    let firstName = req.body.firstName;    


        if(!email || !password || !firstName)      
        return res.status(422).send(formatResponse(true,'You must provide email ,password ,firstname',null));
    
      
        User.findOne({email:email})
        .catch((err)=>{
            next(err);
        })
        .then((val)=>{
            if(val)                        
            return res.status(422).json(formatResponse(true,'Email is in use',null));            

            let user = new User({
            email:email,
            password:password,
            firstName:firstName
            });

            user.save()
            .catch((err)=>{
                mongooseErrorHelper(err); 
                return res.status(422).json(formatResponse(true,_error,null)); 
            })
            .then((val)=>res.send(formatResponse(false,null,{token:tokenForUser(user)})))
        });        
    
}

export function reset(req,res,next)
{ 
    let email = req.body.email;
    
    if(!email)
    return res.status(422).json({hasError:true,error:['You must provide email']});

    User.findOne({email:email})
    .catch(err => next(err))
    .then((val)=>{                        
        agenda.now('reset password',{email:email},(done)=>{
            res.json(201,"");
        });
                      
        
        //res.mailer.send(template,options,callback);        
    });
}

