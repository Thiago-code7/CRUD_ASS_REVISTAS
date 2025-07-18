const express = require('express');
const router = express.Router();
const controller = require('../controllers/assinatura.controller');
const { autenticarToken } = require('../../../middlewares/autenticacao.middleware');
const AutorizacaoMiddleware = require('../../../middlewares/autorizacao.middleware');

// Rotas protegidas
router.get('/', autenticarToken, AutorizacaoMiddleware.autorizar(['assinante', 'funcionario', 'admin']), controller.listar);
router.get('/:id', autenticarToken, AutorizacaoMiddleware.autorizar(['assinante', 'funcionario', 'admin']), controller.buscar);

router.post('/', autenticarToken, AutorizacaoMiddleware.autorizar(['funcionario', 'admin']), controller.criar);
router.put('/:id', autenticarToken, AutorizacaoMiddleware.autorizar(['funcionario', 'admin']), controller.atualizar);
router.delete('/:id', autenticarToken, AutorizacaoMiddleware.autorizar(['funcionario', 'admin']), controller.deletar);
router.delete('/', autenticarToken, AutorizacaoMiddleware.autorizar(['funcionario', 'admin']), controller.deletarTodas);

module.exports = router;
