import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let offerSchema =  new Schema({
    name:{type:String,lowercase:true,reqired:true},
    cost:{type:Number},
    category:{type:String,enum:['Air Time','Data Package']},
    enabled:{type:Boolean, default:false}
});

export default mongoose.model('offer',offerSchema);