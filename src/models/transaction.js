import moment from 'moment';
import mongoose from 'mongoose';

let Schema = mongoose.Schema;


let transactionSchema = new Schema({
    dateStarted:{type:Date,default:moment()},
    lastModified:{type:Date},
    toPhoneNumber:{type:String,require:true},
    offer:{type:Schema.Types.ObjectId,ref:'offer'},
    user:{type:Schema.Types.ObjectId,ref:'user'}
    
});

export default mongoose.model('transaction',transactionSchema);