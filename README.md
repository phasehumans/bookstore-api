# Book Bazaar

Book Bazaar is Node.js/Express backend for an online bookstore. It provides user authentication, books management, reviews, orders, and a mock payments API designed for local development and testing.

Tech stack
- Node.js
- Express
- MongoDB (Mongoose)

Purpose
- Provide a small, extendable backend to demo REST API patterns for e-commerce-like apps.
- Include a mock Razorpay-style payment flow for testing payment handling without external integrations.


## Features
- User registration and JWT-based authentication
- CRUD-like endpoints for books and reviews
- Orders and payments models with a simple mock payment flow


## Install & Run
1. Clone and install

```powershell
git clone <repo-url>
cd "Book Bazaar"
npm install
```

2. Create a `.env` file in the project root (.env.example):

3. Start the server

```powershell
npm run dev
```

The API will be available at:

```
http://localhost:3000/api/v1
```

## Folder structure
Top-level layout of the repository (important files and folders):

```
Book Bazaar/
├─ index.js                # app entry, route wiring
├─ package.json
├─ README.md
├─ .env.example
├─ controllers/           # request handlers
│  ├─ auth.controllers.js
│  ├─ books.controllers.js
│  ├─ orders.controllers.js
│  ├─ payments.controllers.js
│  └─ review.controllers.js
├─ routes/                # express routers
│  ├─ auth.route.js
│  ├─ books.route.js
│  ├─ orders.route.js
│  ├─ payments.route.js
│  └─ review.route.js
├─ model/                 # mongoose models
│  ├─ books.model.js
│  ├─ orders.model.js
│  ├─ payments.model.js
│  ├─ reviews.model.js
│  └─ users.model.js
├─ middlewares/
│  └─ auth.middleware.js
├─ utils/
│  └─ db.js
└─ node_modules/
```

