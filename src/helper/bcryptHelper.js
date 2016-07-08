import bcrypt from 'bcrypt-nodejs';

export function bcryptSaltHashPassword(user,cb)
{                 
    //generate salt and then call the callback
    bcrypt.genSalt(10,function(err,salt){
        if(err) cb(true,null);

        //after the salt is generated hash/encrypt our password using the salt and do a callback
        bcrypt.hash(user.password,salt,null,function(err,hash){
                if(err) cb(true,null); 

                cb(false,hash);                                                                       
        });
    }); 
}

export function bcryptComparePassword(pass,hashPass,cb)
{    
    bcrypt.compare(pass,hashPass,function(err,isMatch){              
        if(err)cb(err,null);
        cb(null,isMatch);
    });
}
