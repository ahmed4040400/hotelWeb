import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import User from './User.js';
import Hotel from './Hotel.js';

const Reservation = db.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  checkIn: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  checkOut: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'canceled'),
    defaultValue: 'pending'
  }
}, {
  timestamps: true
});

// Define relationships
Reservation.belongsTo(User, { 
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
User.hasMany(Reservation, { foreignKey: 'userId' });

Reservation.belongsTo(Hotel, { 
  foreignKey: 'hotelId',
  onDelete: 'CASCADE'
});
Hotel.hasMany(Reservation, { foreignKey: 'hotelId' });

export default Reservation;