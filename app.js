const express = require('express');
require('dotenv').config();

const usuarioRotas = require('./src/modulos/usuario/routes/usuario.routes');

const { syncDB } = require('./src/modulos/assinatura/models');
const assinaturaRotas = require('./src/modulos/assinatura/routes/assinatura.routes');
const autenticacaoRotas = require('./src/modulos/usuario/routes/autenticacao.routes'); // corrigido aqui

const app = express();
app.use(express.json());

app.use('/assinaturas', assinaturaRotas);
app.use('/auth', autenticacaoRotas);

syncDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));



