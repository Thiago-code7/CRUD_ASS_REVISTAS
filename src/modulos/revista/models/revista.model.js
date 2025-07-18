const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Revista = sequelize.define('Revista', {
  nome: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('ativa', 'inativa'),
    allowNull: false,
    defaultValue: 'ativa',
  },
}, {
  timestamps: true,
  tableName: 'Revistas',
});

module.exports = Revista;
