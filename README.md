# Book Store API

REST API for an online bookstore with MongoDB, JWT auth

## Project Structure

```
Book Bazaar/
├── index.js                          # App entry point & route mounting
├── package.json                      # Dependencies & scripts
├── .env.example                      # Environment template
├── .gitignore
│
├── controllers/                      # Business logic layer
│   ├── auth.controllers.js           # User registration & login
│   ├── books.controllers.js          # Book CRUD operations
│   ├── orders.controllers.js         # Order creation & management
│   ├── payments.controllers.js       # Payment processing
│   └── review.controllers.js         # Review & rating operations
│
├── routes/                           # Express route definitions
│   ├── auth.route.js                 # POST /api/auth/register, /login
│   ├── books.route.js                # GET /api/books, POST, PUT, DELETE
│   ├── orders.route.js               # GET /api/orders, POST
│   ├── payments.route.js             # POST /api/payments/process
│   └── review.route.js               # GET /api/reviews, POST, DELETE
│
├── model/                            # Data models & schemas
│   ├── users.model.js                # User schema (email, password, role)
│   ├── books.model.js                # Book schema (title, author, price, etc)
│   ├── cart.models.js                # Cart schema (userId, items array)
│   ├── orders.model.js               # Order schema (userId, items, total, status)
│   ├── payments.model.js             # Payment schema (orderId, amount, status)
│   └── reviews.model.js              # Review schema (userId, bookId, rating, text)
│
├── middlewares/                      # Custom middleware
│   └── auth.middleware.js            # JWT verification & user extraction
│
├── utils/                            # Utility functions
│   ├── db.js                         # MongoDB connection setup
│   └── mail.js                       # Email sending functionality
│
└── postman/
    └── BookBazaar.postman_collection.json  # Complete API documentation
```
