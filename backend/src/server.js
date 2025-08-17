import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/orders.js';

dotenv.config();
const app = express();
app.use(cors()); // allow all, you can restrict to Vercel domain later
app.use(express.json());

app.get('/', (_req,res)=>res.json({ok:true, message:'API OK'}));
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME || 'myshop_pro' })
  .then(()=> app.listen(PORT, ()=>console.log('Server listening on '+PORT)))
  .catch(err=>{ console.error('Mongo connect error', err); process.exit(1); });
