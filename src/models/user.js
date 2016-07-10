import mongoose from 'mongoose';
import {bcryptSaltHashPassword,bcryptComparePassword} from '../helper/bcryptHelper';

let Schema = mongoose.Schema;
let userSchema = new Schema ({
    email:{type:String,unique:true,lowercase:true,required:true},
    password:{type:String,required:true},
    firstName:{type:String,required:true},
    //lastName:{type:String,required:true},
    //phone:{type:String},
    //language:{type:String} 
})
.pre('save',function(next){
    const user =  this; //instance of the usermodel  
    bcryptSaltHashPassword(user,(err,hash)=>{
        if(err) next(err);
        else
        {
            user.password = hash;
            next();  // if we reach here save.
        }
    });    
});


userSchema.methods.comparePassword = function(pass,cb)
{    
    const user =  this; //instance of the usermodel    
    bcryptComparePassword(pass,user.password,(err,isMatch)=>{
        console.log(`err ${err} match ${isMatch}`);  
        if(err)cb(true,null);
        if(!isMatch)cb(null,false);
        cb(null,true);
        
    });

}
 

export default  mongoose.model('user',userSchema);



