# MyShop Backend (MongoDB + Express)
Endpoints:
- POST /api/auth/register
- POST /api/auth/login
- POST /api/orders  (multipart: name, phone, product, amount, slip[file])
- GET  /api/orders  (admin list)
- GET  /api/orders/mine  (JWT)
- PATCH /api/orders/:id/status  (header: x-admin-key)
- PUT   /api/orders/:id/note     (header: x-admin-key)

## Run
npm install
cp .env.example .env   # fill values
npm start

Deploy to Render: Web Service → Start command `node src/server.js`
