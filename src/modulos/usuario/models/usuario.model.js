const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Usuario = sequelize.define('Usuario', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  papel: {
    type: DataTypes.ENUM("usuario"),
    allowNull: false,
    validate: {
      isIn: {
        args: [["usuario"]],
        msg: "O papel deve ser usuario.",
      }
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Usuario;

