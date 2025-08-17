MyShop Pro Ready — Vercel + Render
1) Deploy backend (Render) → set env from backend/.env.example → import backend/schema.sql
2) Copy your backend base URL (e.g., https://xxx.onrender.com/api)
3) Deploy frontend (Vercel) with root = frontend/
4) After deploy, visit /settings and paste API URL → Save
Pretty URLs on Vercel: /login /register /checkout /account /admin /admin/orders
Admin uses ADMIN_KEY header (set in backend .env).