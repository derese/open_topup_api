import User from '../models/user';
import jwt from 'jwt-simple';
import {secret} from '../config.secret';
import {_error,mongooseErrorHelper} from '../helper/helpers';


function tokenForUser(user)
{        
    return jwt.encode({sub:user.id,iat:new Date().getTime()},secret);
}


export function signin(req,res,next)
{
    //*** important user is already authed, by our middlewares
    // we just need to give them a token    
    res.send({token:tokenForUser(req.user)});
}

export function signup(req,res,next)
{
    
    let email = req.body.email;
    let password =  req.body.password;
    let firstName = req.body.firstName;    


     if(!email || !password || !firstName) 
    return res.status(422).json({hasError:true,error:['You must provide email ,password , firstname']});
    
      
        User.findOne({email:email})
        .catch((err)=>{
            next(err);
        })
        .then((val)=>{
            if(val)
            return res.status(422).json({hasError:true,error:["Email is in use"]});

            let user = new User({
            email:email,
            password:password,
            firstName:firstName
            });

            user.save()
            .catch((err)=>{
                mongooseErrorHelper(err); 
                return res.status(422).json({hasError:true,error:_error}); 
            })
            .then((val)=>{res.json({token:tokenForUser(user)});})
        });        
    
}

