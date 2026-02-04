# Jib Stores - E-commerce Platform (Client)

A modern, full-featured e-commerce platform built with React, TypeScript, and Redux Toolkit. This is the frontend client application for Jib Stores, providing both buyer and seller functionalities with a comprehensive marketplace experience.

## 🚀 Overview

Jib Stores is a dual-sided marketplace that allows:

- **Buyers** to browse, search, purchase products, manage wishlists and shopping carts
- **Sellers** to create accounts, list products, manage inventory, and track orders
- **Multi-role authentication** with Google OAuth integration
- **Real-time features** using Socket.IO for live updates
- **Payment processing** through Paystack integration
- **Media management** via Cloudinary for product images

## 🛠 Tech Stack

### Core Technologies

- **React 18.3.1** - UI framework
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework

### State Management

- **Redux Toolkit** - State management with RTK Query for API calls
- **Redux Persist** - Persistent state across browser sessions

### UI Components & Animation

- **Material-UI (MUI)** - Component library with icons
- **GSAP** - Advanced animations
- **Splide.js** - Carousel/slider components
- **React Icons** - Icon library

### Authentication & Backend Integration

- **Firebase Auth** - Authentication service
- **Axios** - HTTP client for API requests
- **Socket.IO Client** - Real-time communication

### Payment & Media

- **Paystack** - Payment processing for Nigerian market
- **Cloudinary** - Image upload and management

### Form Handling & Notifications

- **React Hook Form** - Form validation and handling
- **Sonner** - Toast notifications

## 📁 Project Structure

```
src/
├── api/                    # API layer with RTK Query
│   ├── users/             # User-related APIs
│   │   ├── auth.ts        # Authentication endpoints
│   │   ├── seller.ts      # Seller-specific endpoints
│   │   └── buyer.ts       # Buyer-specific endpoints
│   ├── userSlice/         # User state management
│   └── quantitySlice/     # Shopping cart quantity management
├── components/            # Reusable UI components
│   ├── Navbar.tsx         # Navigation component
│   ├── ProductCard.tsx    # Product display cards
│   ├── Cart.tsx           # Shopping cart component
│   ├── PaystackButton.tsx # Payment integration
│   └── [+18 more components]
├── pages/                 # Route components
│   └── user/              # User-facing pages
│       ├── auth/          # Authentication pages
│       ├── seller/        # Seller dashboard and management
│       ├── Home.tsx       # Main landing page
│       ├── CartPage.tsx   # Shopping cart page
│       ├── CheckOutPage.tsx # Checkout process
│       └── [+8 more pages]
├── config/                # Configuration files
│   ├── firebaseConfig.ts  # Firebase setup
│   └── paystackConfig.ts  # Payment configuration
├── types/                 # TypeScript type definitions
├── assets/                # Static assets (images, videos)
└── hooks/                 # Custom React hooks
```

## 🔐 Authentication System

The platform supports multiple authentication methods:

### User Registration & Login

- Email/password authentication
- Google OAuth integration
- Email verification with OTP
- Password reset functionality

### User Roles

- **Regular Users**: Browse and purchase products
- **Sellers**: Additional permissions to list and manage products
- **Admin**: Platform administration (structure exists)

## 🛒 E-commerce Features

### For Buyers

- **Product Browsing**: View all products with filtering and search
- **Product Details**: Detailed product pages with images and descriptions
- **Wishlist Management**: Save products for later
- **Shopping Cart**: Add/remove items with quantity management
- **Checkout Process**: Secure payment via Paystack
- **Order Tracking**: View order history and status

### For Sellers

- **Seller Registration**: Upgrade to seller account with subscription plans
- **Product Management**: Add, edit, delete products
- **Image Upload**: Multiple product images via Cloudinary
- **Inventory Tracking**: Stock management and sold quantities
- **Order Management**: View and update order statuses
- **Sales Analytics**: Track sales performance

## 💳 Payment Integration

- **Paystack Integration**: Secure payment processing for Nigerian market
- **Subscription Plans**: Seller account upgrades (Free, Basic, Standard)
- **Payment Verification**: Server-side payment confirmation
- **Wallet System**: Basic wallet functionality for users

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Animations**: GSAP-powered smooth transitions
- **Interactive Carousels**: Product showcases and category browsing
- **Loading States**: Skeleton loaders and loading indicators
- **Toast Notifications**: User feedback for actions
- **Material Design**: Consistent UI with MUI components

## 🔧 Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd client
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**
   Create a `.env` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key

# Backend API
VITE_API_BASE_URL=https://jib-stores-backend.vercel.app

# Paystack
VITE_PAYSTACK_PUBLIC_KEY=your_paystack_public_key

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

4. **Start development server**

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## 🌐 API Integration

The application connects to a backend API hosted at `https://jib-stores-backend.vercel.app` with the following main endpoints:

- `/auth/*` - Authentication and user management
- `/seller/*` - Seller-specific operations
- `/buyer/*` - Buyer-specific operations

All API calls are managed through RTK Query with automatic caching and state management.

## 🔄 State Management

The application uses Redux Toolkit with the following slices:

- **User Slice**: User authentication and profile data
- **Quantity Slice**: Shopping cart quantity management
- **API Slices**: Cached API responses for auth, seller, and buyer operations

State persistence is handled by Redux Persist, maintaining user sessions across browser refreshes.

## 📱 Responsive Design

The application is fully responsive with:

- Mobile-first design approach
- Tailwind CSS for consistent styling
- Adaptive layouts for different screen sizes
- Touch-friendly interfaces for mobile devices

## 🚀 Deployment

The application is configured for deployment with:

- Vite build optimization
- Code splitting for better performance
- Environment variable support
- Production-ready bundle configuration

## 🤝 Contributing

This appears to be a commercial e-commerce platform. For contribution guidelines, please refer to the project maintainers.

## 📄 License

Please refer to the project maintainers for licensing information.

