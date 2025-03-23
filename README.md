# Hotel Booking System

A full-stack hotel booking application built with Vue.js and Express.js.

## Project Overview

This project is a comprehensive hotel booking system with the following features:
- User authentication (guests and managers)
- Hotel listing and management
- Reservation creation and management
- Admin dashboard for managers

## Tech Stack

### Frontend
- Vue.js 3 with Composition API
- TypeScript
- Pinia for state management
- Tailwind CSS for styling
- Axios for API calls
- Vite as build tool

### Backend
- Express.js
- MySQL database
- Sequelize ORM
- JWT for authentication

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MySQL server
- Git

### Step 1: Clone the repository
```bash
git clone <repository-url>
cd hotel
```

### Step 2: Set up the database
1. Create a MySQL database named `hotel_db`
2. Update database credentials in `backend/config/db.js` if needed

### Step 3: Install dependencies
Install dependencies for both frontend and backend:

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 4: Run the backend server
```bash
cd backend
npm run dev
```

The backend server will start on port 5000. During the first run, it will:
- Connect to your MySQL database
- Create necessary database tables
- Seed the database with sample data if it's empty

### Step 5: Run the frontend development server
Open another terminal and run:
```bash
npm run dev
```

The frontend will start on a different port (likely 3000 or 5173) and will connect to the backend API.

## Seeding the Database

The database is automatically seeded during the first backend startup if tables are empty. To manually reset and seed the database:

1. Stop the backend server if it's running
2. Run the seeder script:
```bash
cd backend
node config/seeder.js --import
```

This will:
- Drop existing tables (if they exist)
- Create new tables
- Seed the database with sample hotels and user accounts

## Sample Accounts

After seeding, you can use the following accounts to test the application:

### Manager Login
- Email: admin@luxstay.com
- Password: admin123

### Guest Login
- Email: guest@example.com
- Password: guest123

## API Documentation

### Authentication Endpoints
- POST /api/users/login - Login for users
- POST /api/users/register - Register a new user
- GET /api/users/profile - Get current user profile

### Hotel Endpoints
- GET /api/hotels - Get all hotels
- GET /api/hotels/:id - Get hotel by ID
- POST /api/hotels - Create a new hotel (manager only)
- DELETE /api/hotels/:id - Delete a hotel (manager only)

### Reservation Endpoints
- GET /api/reservations - Get all reservations (manager only)
- GET /api/reservations/my - Get logged in user's reservations
- GET /api/reservations/:id - Get reservation by ID
- POST /api/reservations - Create a new reservation
- PUT /api/reservations/:id/status - Update reservation status (manager only)
- DELETE /api/reservations/:id - Delete a reservation

## Project Structure

### Frontend
- `src/components` - Reusable UI components
- `src/pages` - Main view components
- `src/stores` - Pinia state management stores
- `src/services` - API service layer

### Backend
- `backend/controllers` - API route controllers
- `backend/models` - Sequelize database models
- `backend/routes` - Express routes
- `backend/config` - Configuration files

## License

[MIT License](LICENSE)
