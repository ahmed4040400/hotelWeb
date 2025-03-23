import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';

// Database configuration
const DB_NAME = 'luxstay_db';
const DB_USER = 'root2';  // Updated username
const DB_PASSWORD = 'password';   // Updated password
const DB_HOST = 'localhost';
const DB_PORT = 3306;

// Function to initialize database if it doesn't exist
const initializeDatabase = async () => {
  try {
    // Create connection without database name
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD
    });
    
    console.log('Checking if database exists...');
    
    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME};`);
    console.log(`Database ${DB_NAME} ensured.`);
    
    // Close the connection
    await connection.end();
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Create Sequelize instance
const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false, // Disable logging
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export { initializeDatabase };
export default db;