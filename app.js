const express = require('express');
require('dotenv').config();

const usuarioRotas = require('./src/modulos/usuario/routes/usuario.routes');
const assinaturaRotas = require('./src/modulos/assinatura/routes/assinatura.routes');
const autenticacaoRotas = require('./src/modulos/usuario/routes/autenticacao.routes');
const revistaRotas = require('./src/modulos/revista/routes/revista.routes'); // <=== importar as rotas de revista

const { syncDB } = require('./src/modulos/assinatura/models');

const app = express();
app.use(express.json());

app.use('/assinaturas', assinaturaRotas);
app.use('/auth', autenticacaoRotas);
app.use('/usuarios', usuarioRotas);
app.use('/revistas', revistaRotas); // <=== registrar as rotas para /revistas

syncDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
