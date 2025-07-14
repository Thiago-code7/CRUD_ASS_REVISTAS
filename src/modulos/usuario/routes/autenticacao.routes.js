const express = require('express');
const router = express.Router();
const autenticacaoController = require('../controllers/autenticacao.controller');

router.post('/login', autenticacaoController.login);

module.exports = router;
