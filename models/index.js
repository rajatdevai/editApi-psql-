const sequelize = require('../config/db');
const User = require('./user');

const db = {
  User,
  sequelize,
};

module.exports = db;
