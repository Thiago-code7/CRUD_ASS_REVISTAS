const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/');
const AutenticacaoMiddleware = require('../../../middlewares/autenticacao.middleware');
const AutorizacaoMiddleware = require('../../../middlewares/autorizacao.middleware');

router.post('/', usuarioController.criarUsuario);
router.post('/login', usuarioController.login);

router.get(
  '/',
  AutenticacaoMiddleware.autenticarToken,  // Corrigido aqui
  AutorizacaoMiddleware.autorizar(['admin']),
  usuarioController.listarUsuarios
);

module.exports = router;
