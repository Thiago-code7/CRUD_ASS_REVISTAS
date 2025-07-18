const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario.controller');
const { autenticarToken } = require('../../../middlewares/autenticacao.middleware');
const autorizacaoMiddleware = require('../../../middlewares/autorizacao.middleware');

// Rota para cadastro de usuário (sem autenticação)
router.post('/', usuarioController.criarUsuario);

// Rota para login (sem autenticação)
router.post('/login', usuarioController.login);

// Rota para consultar o perfil do usuário autenticado
router.get(
  '/me',
  autenticarToken,
  usuarioController.perfilUsuario  // Função que retorna os dados do usuário logado
);

module.exports = router;
