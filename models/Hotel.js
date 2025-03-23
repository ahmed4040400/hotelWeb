import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Hotel = db.define('Hotel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5
    }
  },
  reviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  distance: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

export default Hotel;