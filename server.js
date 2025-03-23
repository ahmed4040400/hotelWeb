import express from 'express';
import cors from 'cors';
import db, { initializeDatabase } from './config/db.js';
import seedData from './config/seeder.js';
import hotelRoutes from './routes/hotelRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/hotels', hotelRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to LuxStay API' });
});

// Initialize and connect to database
const startServer = async () => {
  try {
    // Initialize database
    await initializeDatabase();
    
    // Test database connection and sync models
    await db.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync models
    await db.sync({ alter: true });
    console.log('Database synchronized');
    
    // Seed initial data
    await seedData();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
};

startServer();