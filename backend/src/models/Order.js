import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  userId:{ type: mongoose.Schema.Types.ObjectId, ref:'User', default:null },
  customer_name:{ type:String, required:true },
  phone:{ type:String, required:true },
  product:{ type:String, required:true },
  amount_usd:{ type:Number, required:true },
  slip_url:{ type:String, default:null },
  delivery_note:{ type:String, default:null },
  status:{ type:String, enum:['Pending','Verified','Complete'], default:'Pending' }
},{timestamps:true});
export default mongoose.model('Order', schema);
