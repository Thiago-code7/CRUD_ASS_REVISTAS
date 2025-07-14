const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Usuario = sequelize.define('Usuario', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Usuario;

