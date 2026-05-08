# Online Pharmacy Store 🏥

Welcome to the **Online Pharmacy Store** project! This repository contains a fully functional, full-stack E-Commerce and Point of Sale (POS) web application designed specifically for pharmacies to manage their business online.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Project Architecture](#-project-architecture)
- [Database Models](#-database-models)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Installation & Setup](#-installation--setup)
- [Available Scripts](#-available-scripts)
- [State Management](#-state-management)
- [Third-Party Integrations](#-third-party-integrations)
- [Troubleshooting](#-troubleshooting)

---

## 🌟 Overview

Zahid Pharmacy Store aims to bridge the gap between customers and their pharmaceutical needs. It provides a clean, responsive, and intuitive interface for customers to browse medicines and products, alongside robust internal tooling for pharmacy administrators and employees to track inventory, process orders, and manage users.

---

## ✨ Key Features

- **Multi-Role Authentication**: Distinct login flows for Admins, Employees, and Users using JWT.
- **Product Catalog**: Comprehensive listing with search, filtering, and rich text descriptions.
- **Interactive Cart & Checkout**: Add/remove items dynamically, calculate totals, and process secure checkouts.
- **Order Management & Tracking**: Real-time status updates from `Pending` to `Delivered`.
- **Automated Emails**: Sends email receipts and order status updates using Nodemailer and EmailJS.
- **Sales Analytics Dashboard**: Visual charts for revenue and order statistics using Recharts.
- **Physical Store Locator**: Interactive Leaflet maps embedded directly into the application.
- **Cloud File Storage**: Direct image and asset uploads to AWS S3.
- **Responsive UI**: Hand-crafted layouts utilizing Tailwind CSS and @shadcn/ui.

---

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 15.3.1 (App Router, Turbopack enabled)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, @shadcn/ui, @mantine/core
- **Icons**: React Icons, Heroicons
- **Animations**: Framer Motion
- **Maps**: Leaflet, React-Leaflet
- **Data Visualization**: Recharts
- **Rich Text Editing**: React Quill / Mantine RTE

### Backend
- **Runtime**: Node.js (via Next.js API Routes)
- **Database**: MongoDB
- **ORM**: Mongoose
- **File Uploads**: Formidable, AWS SDK S3
- **Authentication**: JWT (`jsonwebtoken`, `jose`, `bcryptjs`)
- **Email Delivery**: Nodemailer, EmailJS

---

## 📂 Project Architecture

The codebase follows the Next.js App Router structure:

```text
Zahid Pharmacy Store/
├── public/                 # Static assets (images, fonts, favicons)
├── src/
│   ├── app/                # Next.js App Router pages, layouts, and API routes
│   │   ├── api/            # Backend REST API routes
│   │   └── user/           # Customer-facing pages (cart, orders, profile)
│   ├── components/         # Reusable React UI components (Footer, Navbar, Modals)
│   ├── lib/                # Shared utilities (db connection, AWS S3 config)
│   ├── models/             # Mongoose schemas for MongoDB
│   ├── redux/              # Redux slices and global store configuration
│   └── utils/              # Helper functions and Email templates
├── middleware.ts           # Next.js middleware for route protection (JWT validation)
├── next.config.ts          # Next.js configuration settings
├── tailwind.config.ts      # Tailwind CSS theme configuration
└── package.json            # Project dependencies and NPM scripts
```

---

## 🗄 Database Models

The MongoDB database consists of the following core Mongoose schemas:

- **Users (`Users.ts`)**: Stores customer details, hashed passwords, and contact info.
- **Employee (`Employee.ts`)**: Stores staff details and role-based access.
- **Product (`Product.ts`)**: Medicine and item details (price, stock, image URLs, categories).
- **Category (`Category.ts`)**: Product groupings for filtering.
- **Cart (`Cart.ts`)**: Temporary state of user shopping carts.
- **Order (`Order.ts`)**: Order transactions, shipping addresses, items purchased, and fulfillment status.
- **Testimonial (`Testimonial.ts`)**: User reviews and feedback.

---

## 📡 API Endpoints

The Next.js backend API is divided into role-based directories:

- `/api/user/*`: Authentication (login, register, reset password) and profile endpoints.
- `/api/cart/*`: Cart operations (add, remove, clear, sync).
- `/api/orders/*`: Order placement, fetching order history, and payment processing.
- `/api/admin/*`: Admin-only endpoints for CRUD operations on products, employees, and categories.
- `/api/employee/*`: Endpoints for employees to view and update order statuses.

---

## 🔐 Environment Variables

To run this project securely, create a `.env` file in the root directory and define the following variables:

```env
# MongoDB Connection String
MONGODB_URI=your_mongodb_connection_string

# JWT Secrets for Authentication
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# AWS S3 Bucket for File Uploads
AWS_REGION=your_aws_region
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET_NAME=your_s3_bucket_name

# Nodemailer Configuration (For Order Status Emails)
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_app_password
```

---

## 🚀 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd "Zahid Pharmacy Store"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Copy the keys from the **Environment Variables** section into a local `.env` file and populate them with your development credentials.

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   *Note: If port 3000 is occupied, Next.js will automatically fall back to 3001, 3002, etc.*

5. **Access the Application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💻 Available Scripts

- `npm run dev` - Starts the development server with Turbopack.
- `npm run build` - Builds the application for production deployment.
- `npm run start` - Starts the Next.js production server.
- `npm run lint` - Runs ESLint to identify and report on patterns in JavaScript/TypeScript.

---

## 🧠 State Management

The application utilizes **Redux Toolkit** for complex global state. The store is located in `src/redux/store.ts` and uses the following slices:

- **`authSlice.ts`**: Manages user authentication status, JWT tokens, and user metadata.
- **`adminSlice.ts`**: Manages admin dashboard data.
- **`employSlice.ts`**: Manages employee-specific data views.
- **`apiSlice.ts`**: Uses RTK Query for fetching data caching and synchronization.

---

## 🔌 Third-Party Integrations

- **AWS S3**: Product images are safely uploaded and hosted in an S3 bucket (`src/lib/s3.ts`).
- **Leaflet & OpenStreetMap**: Embedded maps help users locate the physical pharmacy (`SocialMedia.tsx`). Note: Leaflet is imported dynamically (`ssr: false`) to avoid server-side rendering errors.
- **Nodemailer**: Automatically generates HTML PDFs (`OrderStatus.ts`) and emails them to users when their order changes.

---

## 🐛 Troubleshooting

- **`window is not defined` Error**: If you see this error, ensure that any library relying on browser APIs (like Leaflet) is dynamically imported with `{ ssr: false }` via `next/dynamic`.
- **Email Sending Fails**: Ensure your Google Account has "App Passwords" enabled, and you are using the app password in `GMAIL_PASS`, not your regular login password.
- **Database Connection Issues**: Verify your IP address is whitelisted in MongoDB Atlas and your `MONGODB_URI` string is formatted correctly.

---

**© 2025 Zahid Pharmacy. All Rights Reserved.**
