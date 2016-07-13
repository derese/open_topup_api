import mongoose from 'mongoose';

let Schema = mongoose.Schema;
export let userContactSchema = new Schema({
    firstName:{type:String,lowercase:true,required:true},
    lastName:{type:String,lowercase:true,required:true},
    phoneNumber:{type:String,required:true},
    contactGroup:{type:String,lowercase:true},
});

//we should only export the schema for 
//Sub Documents if we do mongoose.model
//the parent save method will be skipped.
//export default mongoose.model('userContact',userContactSchema);