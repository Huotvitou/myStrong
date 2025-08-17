
MyShop Full Stack (Frontend + Backend)

Folders:
- backend/  (Node.js + Express + MongoDB + Cloudinary)
- frontend/ (HTML + Bootstrap, pretty URLs for Vercel)

Quick start local:
1) Backend
   cd backend
   npm install
   cp .env.example .env   # fill values (MongoDB Atlas + Cloudinary + secrets)
   npm start              # http://localhost:4000

2) Frontend
   Open frontend/index.html in browser
   or deploy to Vercel (Project root = frontend/)

Deploy (recommended):
- Backend → Render (Web Service). Start command: node src/server.js
- Frontend → Vercel (root = frontend/)
- After deploy, visit FRONTEND /settings and set API Base URL to: https://<your-backend-host>/api

Admin:
- /admin (enter ADMIN_KEY from backend .env)
- /admin/orders  (change status, add delivery note)

Customer:
- /register → /login → /account (My Orders)
- /checkout (upload ABA QR slip)

Good luck!
