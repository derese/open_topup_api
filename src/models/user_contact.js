import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let userContactSchema = new Schema({
    firstName:{type:String,lowercase:true,required:true},
    lastName:{type:String,lowercase:true,required:true},
    phoneNumber:{type:String,required:true},
    contactGroup:{type:String,lowercase:true},
});


export default mongoose.model('userContact',userContactSchema);