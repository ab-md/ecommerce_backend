# E-Commerce Backend API

A RESTful backend API for an e-commerce application built with **Node.js**, **Express 5**, and **MongoDB** using **Mongoose**. The project is organized into feature-based modules and uses JWT authentication, role-based authorization, request validation, and file uploads.

## Features

- User registration, email verification, and login
- JWT-based authentication
- Role-based access control (`user`, `manager`, `admin`)
- Product and category management
- Product image and gallery uploads
- User address management
- Shopping cart management
- Order creation and order-status management
- User-initiated cancellation of pending orders
- Payment record creation and a simulated payment-result flow
- Request validation with Zod
- Centralized error handling

> **Payment notice:** The current payment flow is a development simulation. It is not connected to a live payment gateway and must not be treated as production payment verification. A real integration must verify payment server-side with the payment provider.

## Tech Stack

- Node.js (ES Modules)
- Express 5
- MongoDB and Mongoose
- JSON Web Token (`jsonwebtoken`)
- Zod
- bcrypt
- Multer
- Nodemailer

## Requirements

- Node.js and npm
- MongoDB database (local MongoDB or MongoDB Atlas)
- Gmail credentials or an app password for the email-verification flow

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd e-commerce-backend-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
DB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

- `PORT`: Port used by the Express server.
- `DB_URI`: MongoDB connection string.
- `EMAIL_USER`: Gmail address used to send verification emails.
- `EMAIL_PASS`: Gmail app password (not your regular account password).

Never commit your real `.env` file or expose credentials in the repository.

### 4. Run the application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The API is served from:

```text
http://localhost:3000
```

The port may differ if you set another value in `.env`.

## API Routes

All routes are mounted at the root path. The following table summarizes the route groups and their main endpoints.

### Authentication — `/auth`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a user |
| POST | `/auth/send-code` | Send an email-verification code |
| POST | `/auth/check-code` | Verify the email-verification code |
| POST | `/auth/login` | Log in and receive an authentication token |

### Users — `/users`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/users` | Retrieve the user list |

### Addresses — `/users/address`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/users/address` | Create an address | Authenticated |
| GET | `/users/address` | Get the current user's addresses | Authenticated |
| GET | `/users/address/:id` | Get an address | Authenticated |
| PUT | `/users/address/:id` | Update an address | Authenticated |
| DELETE | `/users/address/:id` | Delete an address | Authenticated |
| GET | `/users/address/protected/all` | Get all addresses | Admin / Manager |
| GET | `/users/address/protected/:id` | Get an address by ID | Admin / Manager |

### Categories — `/categories`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/categories/active` | List active categories | Public |
| GET | `/categories/active/:slug` | Get an active category | Public |
| GET | `/categories/all` | List all categories | Admin / Manager |
| GET | `/categories/:slug` | Get a category | Admin / Manager |
| POST | `/categories` | Create a category | Admin / Manager |
| PUT | `/categories/:slug` | Update a category | Admin / Manager |
| DELETE | `/categories/:slug` | Delete a category | Admin |

### Products — `/products`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/products/active` | List active products | Public |
| GET | `/products/active/:slug` | Get an active product | Public |
| GET | `/products/all` | List all products | Admin / Manager |
| GET | `/products/:slug` | Get a product | Admin / Manager |
| POST | `/products` | Create a product | Admin / Manager |
| PUT | `/products/:slug` | Update a product | Admin / Manager |
| DELETE | `/products/:slug` | Delete a product | Admin |

### Cart — `/cart`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/cart/add` | Add an item to the cart | Authenticated |
| PATCH | `/cart/remove` | Decrease/remove an item quantity | Authenticated |
| PATCH | `/cart/remove-item` | Remove an item from the cart | Authenticated |
| GET | `/cart` | Get the current user's cart | Authenticated |
| GET | `/cart/all` | Get all carts | Admin / Manager |
| GET | `/cart/user/:id` | Get a user's cart | Admin / Manager |

### Orders — `/orders`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/orders` | Create an order | Authenticated |
| GET | `/orders` | List the current user's orders | Authenticated |
| GET | `/orders/:id` | Get one of the current user's orders | Authenticated |
| PATCH | `/orders/:id/cancel` | Cancel a pending order | Authenticated |
| PATCH | `/orders/:id` | Update an order status | Admin / Manager |
| GET | `/orders/all` | List all orders | Admin / Manager |
| GET | `/orders/all/:id` | Get an order by ID | Admin / Manager |
| GET | `/orders/user/:userId` | List a user's orders | Admin / Manager |
| GET | `/orders/user/:userId/:orderId` | Get one order belonging to a user | Admin / Manager |

### Payments — `/payments`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/payments/create` | Create a payment record for an order | Authenticated |
| POST | `/payments/pay` | Submit a simulated payment result | Authenticated |
| GET | `/payments/user` | List the current user's payments | Authenticated |
| GET | `/payments/user/:id` | Get one of the current user's payments | Authenticated |
| GET | `/payments/all` | List all payments | Admin / Manager |
| GET | `/payments/:id` | Get a payment by ID | Admin / Manager |
| GET | `/payments/userpay/:id` | Get a user's payments | Admin / Manager |
| GET | `/payments/userpay/:userId/:paymentId` | Get one payment belonging to a user | Admin / Manager |

Protected endpoints require the authentication token in the format expected by the authentication middleware.

## Project Structure

```text
.
├── server.js
└── src/
    ├── common/
    │   ├── guard/
    │   ├── middlewares/
    │   └── utils/
    ├── config/
    ├── modules/
    │   ├── address/
    │   ├── auth/
    │   ├── cart/
    │   ├── categories/
    │   ├── orders/
    │   ├── payment/
    │   ├── products/
    │   └── users/
    └── index.route.js
```

Each feature module contains its related model, controller, routes, service, validation, and message files where applicable.

## Notes

- User registration requires email verification.
- Product and category images are handled through Multer and stored in the project's public upload directory.
- Order items store product details as a snapshot so that later product changes do not rewrite the historical order information.
- The payment result endpoint currently simulates the gateway response. Do not expose client-controlled payment results in a production deployment.
- This repository represents the current project scope. Features such as full user-profile management, Swagger documentation, live payment-gateway integration, and additional payment/order safeguards may be added in a later version.

## License

This project currently uses the `ISC` license declared in `package.json`.
