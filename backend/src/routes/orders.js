import { Router } from 'express';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import Order from '../models/Order.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits:{fileSize:10*1024*1024} });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

function auth(req,res,next){
  const h=req.headers.authorization||'';
  const t=h.startsWith('Bearer ')?h.slice(7):null;
  if(!t) return res.status(401).json({error:'No token'});
  try{ const p=jwt.verify(t, process.env.JWT_SECRET); req.user={id:p.id, name:p.name}; next(); }
  catch{ return res.status(401).json({error:'Invalid token'}); }
}
function adminGuard(req,res,next){
  const key=req.headers['x-admin-key'];
  if(!key || key!==process.env.ADMIN_KEY) return res.status(401).json({error:'Bad admin key'});
  next();
}

router.post('/', upload.single('slip'), async (req,res)=>{
  try{
    const { name, phone, product, amount } = req.body;
    if(!name||!phone||!product||!amount) return res.status(400).json({error:'Missing fields'});
    let userId=null;
    const h=req.headers.authorization||'';
    if(h.startsWith('Bearer ')){ try{ const p=jwt.verify(h.slice(7), process.env.JWT_SECRET); userId=p.id; }catch{} }
    let slipUrl=null;
    if(req.file){
      const dataUri = 'data:'+req.file.mimetype+';base64,'+req.file.buffer.toString('base64');
      const up = await cloudinary.uploader.upload(dataUri, {folder:'myshop/slips'});
      slipUrl = up.secure_url;
    }
    const o = await Order.create({ userId, customer_name:name, phone, product, amount_usd:Number(amount), slip_url:slipUrl });
    res.json({ok:true, id:o._id});
  }catch(e){ console.error(e); res.status(500).json({error:'Create order failed'}); }
});

router.get('/', async (_req,res)=>{
  const list = await Order.find().sort({createdAt:-1});
  res.json(list);
});

router.get('/mine', auth, async (req,res)=>{
  const list = await Order.find({userId:req.user.id}).sort({createdAt:-1});
  res.json(list);
});

router.patch('/:id/status', adminGuard, async (req,res)=>{
  const {status} = req.body;
  if(!['Pending','Verified','Complete'].includes(status)) return res.status(400).json({error:'Bad status'});
  await Order.findByIdAndUpdate(req.params.id, {status});
  res.json({ok:true});
});

router.put('/:id/note', adminGuard, async (req,res)=>{
  const {note} = req.body;
  await Order.findByIdAndUpdate(req.params.id, {delivery_note: note||null});
  res.json({ok:true});
});

export default router;
