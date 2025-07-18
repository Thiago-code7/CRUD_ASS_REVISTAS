const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const roles = ['usuario', 'funcionario', 'admin'];

const Usuario = sequelize.define('Usuario', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: 'Email inválido' }
    }
  },
  papel: {
    type: DataTypes.ENUM(...roles), // funciona no Postgres
    allowNull: false,
    defaultValue: 'usuario',
    validate: {
      isIn: {
        args: [roles],
        msg: `Papel deve ser um dos seguintes: ${roles.join(', ')}`
      }
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Para SQLite, que não suporta ENUM, Sequelize cria a coluna como STRING com validação,
// então isso funcionará em ambos os bancos.

module.exports = Usuario;
