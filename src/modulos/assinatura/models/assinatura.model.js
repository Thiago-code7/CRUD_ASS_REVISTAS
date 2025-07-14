const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database'); // Caminho agora está certo

const Assinatura = sequelize.define('Assinatura', {
  assinante_nome: DataTypes.STRING,
  email: DataTypes.STRING,
  revista_nome: DataTypes.STRING,
  data_inicio: DataTypes.DATEONLY,
  data_fim: DataTypes.DATEONLY,
  status: DataTypes.ENUM('ativa', 'cancelada', 'expirada')
});

module.exports = Assinatura;
