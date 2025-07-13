# SubTracker API

A Node.js/Express REST API for managing user subscriptions.

## Features

- User authentication (sign up, sign in, sign out)
- Subscription CRUD (create, read, update, delete)
- User management
- Rate limiting, bot detection, and security via Arcjet
- Error handling middleware

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT authentication
- Arcjet security
- Morgan logging

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB database

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.development.local` file in `src/` with the following (see sample):

```
PORT=5500
NODE_ENV=development
DB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

### Running the Server

```bash
npm run dev
```

### API Endpoints

- `POST   /api/v1/auth/sign-up` - Register a new user
- `POST   /api/v1/auth/sign-in` - User login
- `POST   /api/v1/auth/sign-out` - User logout
- `GET    /api/v1/users` - List all users
- `GET    /api/v1/users/:id` - Get user by ID
- `POST   /api/v1/subscriptions` - Create subscription (auth required)
- `GET    /api/v1/subscriptions` - List all subscriptions
- `GET    /api/v1/subscriptions/:id` - Get subscription by ID
- ...more in `src/routes/`
