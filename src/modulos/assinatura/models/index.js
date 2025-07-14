
const Assinatura = require('./assinatura.model');
const sequelize = require('../../../config/database');


async function syncDB() {
  await sequelize.sync({ alter: true });
  console.log('DB sincronizado');
}

module.exports = { Assinatura, syncDB };
