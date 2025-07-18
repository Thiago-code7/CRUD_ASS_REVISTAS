require('dotenv').config();
const path = require('path');
const { Sequelize } = require('sequelize');

const dialect = process.env.DB_DIALECT || 'sqlite';

let sequelize;

if (dialect === 'sqlite') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || path.join(__dirname, '../../database.sqlite'),
    logging: false, // desativa logs SQL, pode ativar se quiser
  });
} else if (dialect === 'postgres') {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'postgres',
      logging: false, // desativa logs SQL
      dialectOptions: {
        ssl: process.env.DB_SSL === 'true', // configurar SSL se precisar
      },
    }
  );
} else {
  throw new Error(`Dialect não suportado: ${dialect}`);
}

module.exports = sequelize;
