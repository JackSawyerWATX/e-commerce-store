# E-Commerce Store

A full-stack e-commerce application with a modern React frontend and Node.js/Express backend. Features product management, shopping cart, secure payments with Stripe, user authentication, and analytics.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

## 📖 Overview

This is a complete e-commerce platform that allows users to browse products, manage their shopping cart, apply discount coupons, and securely checkout with Stripe payment processing. The application includes an admin dashboard for product and analytics management.

## ✨ Features

- **User Authentication**: Secure JWT-based authentication with bcryptjs password hashing
- **Product Management**: Browse, filter, and search products with image hosting via Cloudinary
- **Shopping Cart**: Add/remove items with persistent state management
- **Discount Coupons**: Apply promotional codes to reduce order total
- **Payment Processing**: Secure Stripe integration for checkout
- **Admin Dashboard**: Manage products, view analytics with charts and graphs
- **Real-time Updates**: Redis caching for improved performance
- **Responsive Design**: Mobile-friendly UI built with TailwindCSS
- **Analytics**: Track sales, revenue, and customer metrics

## 🛠 Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Axios** - HTTP client
- **Stripe.js** - Payment processing
- **Framer Motion** - Animation library
- **Recharts** - Data visualization charts
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications
- **React Confetti** - Celebration animations
- **ESLint** - Code linting

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Stripe** - Payment API
- **Redis (ioredis)** - Caching layer
- **Cloudinary** - Image hosting and management
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **Cookie Parser** - Cookie handling
- **Nodemon** - Development server
- **Dotenv** - Environment variable management

## 📦 Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** instance (local or cloud, e.g., MongoDB Atlas)
- **Redis** instance (local or cloud)
- **Stripe Account** (for payment processing)
- **Cloudinary Account** (for image hosting)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-commerce-store
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   npm install --prefix frontend
   ```

4. **Install backend dependencies** (if not already included)
   ```bash
   npm install
   ```

## 🔐 Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>

# Redis
REDIS_URL=redis://<host>:<port>

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx

# Cloudinary
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

# JWT
JWT_SECRET=your_jwt_secret_key
```

## 🎯 Running the Application

### Development Mode

**Start both backend and frontend in development:**
```bash
npm run dev
```

This will:
- Start the backend server on `http://localhost:5000`
- Start the Vite dev server on `http://localhost:5173`

### Production Build

**Build for production:**
```bash
npm run build
```

This will:
- Install all dependencies
- Build the frontend with Vite
- Create optimized production bundles

**Start production server:**
```bash
npm start
```

The backend will serve the built frontend from `frontend/dist`.

## 📁 Project Structure

```
e-commerce-store/
├── backend/
│   ├── server.js                 # Express app entry point
│   ├── controllers/              # Route handlers
│   │   ├── auth.controller.js
│   │   ├── product.controller.js
│   │   ├── cart.controller.js
│   │   ├── coupon.controller.js
│   │   ├── payment.controller.js
│   │   └── analytics.controller.js
│   ├── routes/                   # API route definitions
│   │   ├── auth.route.js
│   │   ├── product.route.js
│   │   ├── cart.route.js
│   │   ├── coupon.route.js
│   │   ├── payment.route.js
│   │   └── analytics.route.js
│   ├── models/                   # Mongoose schemas
│   │   ├── user.model.js
│   │   ├── product.model.js
│   │   ├── order.model.js
│   │   └── coupon.model.js
│   ├── middleware/               # Express middleware
│   │   └── auth.middleware.js
│   └── lib/                      # Configuration files
│       ├── db.js                 # MongoDB connection
│       ├── redis.js              # Redis client
│       ├── stripe.js             # Stripe configuration
│       └── cloudinary.js         # Cloudinary configuration
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx              # React entry point
│   │   ├── App.jsx               # Root component
│   │   ├── index.css             # Global styles
│   │   ├── components/           # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CartItem.jsx
│   │   │   ├── CreateProductForm.jsx
│   │   │   ├── AnalyticsTab.jsx
│   │   │   └── ...
│   │   ├── pages/                # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── AdminPage.jsx
│   │   │   ├── LogInPage.jsx
│   │   │   ├── SignUpPage.jsx
│   │   │   └── ...
│   │   ├── stores/               # Zustand state stores
│   │   │   ├── useUserStore.js
│   │   │   ├── useProductStore.js
│   │   │   └── useCartStore.js
│   │   └── lib/
│   │       └── axios.js          # Axios instance configuration
│   ├── vite.config.js            # Vite configuration
│   ├── tailwind.config.js        # TailwindCSS configuration
│   ├── eslint.config.js          # ESLint configuration
│   └── package.json
│
├── tailwind.config.js            # Root TailwindCSS config
├── postcss.config.js             # PostCSS configuration
├── package.json                  # Root dependencies
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get current user profile
- `POST /api/auth/refresh-token` - Refresh authentication token

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `GET /api/products/featured` - Get featured products

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart

### Coupons
- `GET /api/coupons` - Get all active coupons
- `POST /api/coupons` - Create coupon (admin only)
- `POST /api/coupons/validate` - Validate coupon code

### Payments
- `POST /api/payments/create-checkout-session` - Create Stripe checkout
- `POST /api/payments/webhook` - Handle Stripe webhook events

### Analytics
- `GET /api/analytics/sales` - Get sales analytics (admin only)
- `GET /api/analytics/revenue` - Get revenue data (admin only)

## 📜 Available Scripts

```bash
# Root level
npm run dev          # Start development servers
npm start            # Start production server
npm run build        # Build for production

# Frontend (run with --prefix frontend)
npm run dev --prefix frontend          # Start Vite dev server
npm run build --prefix frontend        # Build frontend
npm run lint --prefix frontend         # Lint code
npm run preview --prefix frontend      # Preview production build

# Backend (run from root)
npm run dev          # Start with nodemon (watches for changes)
```

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 🆘 Troubleshooting

### Port already in use
If port 5000 or 5173 is in use, you can change the port:
```bash
PORT=3000 npm start
```

### MongoDB connection fails
- Verify your MongoDB URI in `.env`
- Ensure your IP address is whitelisted in MongoDB Atlas
- Check that your credentials are correct

### Redis connection fails
- Ensure Redis is running locally or accessible remotely
- Verify Redis URL in `.env`

### Build fails on deployment
- Ensure `npm run build` in `package.json` matches your build tool
- Check that all environment variables are set in the deployment environment

---

**Questions?** Feel free to open an issue or reach out to the development team.
