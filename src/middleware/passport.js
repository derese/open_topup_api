import passport from 'passport';
import User from '../models/user';
import {secret} from '../config.secret';
import {Strategy as JwtStrategy,ExtractJwt} from 'passport-jwt'; 
import LocalStrategy from 'passport-local';


//Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey:secret
};


//create local strategy for email and password login
//verify this email and password and call done with the user if correct
//else call done with false
const localOptions = {usernameField:'email'};
const localLogin = new LocalStrategy(localOptions,(email,password,done)=>{             
    User.findOne({email:email})
    .catch(err => {return done(err,false)})
    .then((user)=>{                    
        if(user)
        {              
            user.comparePassword(password,(err,match)=>{
                console.log(`err ${err} match ${match}`);
                if(err){return done(err)}
                if(!match){return done(null,false);}

                 return done(null,user);
            });
        }
        else
        return done(null,false);
    });
});


//Create JWT Strategy
//if the userID exists call done with User Object
//if not call done with out a user Object
const jwtLogin = new JwtStrategy(jwtOptions,(payload,done)=>{   
    User.findById(payload.sub)
    .catch(err => done(err,false))
    .then((user)=>{
        if(user)
        return done(null,user);
        else
        return done(null,false);
    });
});

//Tell passport to use this Strategy
passport.use(jwtLogin);
passport.use(localLogin);