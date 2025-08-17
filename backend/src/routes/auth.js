import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();

router.post('/register', async (req,res)=>{
  try{
    const {name, phone, email, password} = req.body;
    if(!name||!phone||!email||!password) return res.status(400).json({error:'Missing fields'});
    const exists = await User.findOne({email});
    if(exists) return res.status(409).json({error:'Email exists'});
    const passwordHash = await bcrypt.hash(password, 10);
    const u = await User.create({name, phone, email, passwordHash});
    const token = jwt.sign({id:u._id, name:u.name}, process.env.JWT_SECRET, {expiresIn:'7d'});
    res.json({ok:true, token, user:{id:u._id, name:u.name, email:u.email}});
  }catch(e){ console.error(e); res.status(500).json({error:'Register failed'}); }
});

router.post('/login', async (req,res)=>{
  try{
    const {email, password} = req.body;
    const u = await User.findOne({email});
    if(!u) return res.status(401).json({error:'Invalid credentials'});
    const ok = await bcrypt.compare(password, u.passwordHash);
    if(!ok) return res.status(401).json({error:'Invalid credentials'});
    const token = jwt.sign({id:u._id, name:u.name}, process.env.JWT_SECRET, {expiresIn:'7d'});
    res.json({ok:true, token, user:{id:u._id, name:u.name, email:u.email}});
  }catch(e){ console.error(e); res.status(500).json({error:'Login failed'}); }
});

export default router;
