const express = require('express');
const router = express.Router();
const controller = require('../controllers/assinatura.controller');
const autenticar = require('../../../middlewares/autenticacao.middleware');
const AutorizacaoMiddleware = require('../../../middlewares/autorizacao.middleware');

// Rotas protegidas
router.get('/', autenticar, AutorizacaoMiddleware.autorizar(['assinante', 'funcionario', 'admin']), controller.listar);
router.get('/:id', autenticar, AutorizacaoMiddleware.autorizar(['assinante', 'funcionario', 'admin']), controller.buscar);

router.post('/', autenticar, AutorizacaoMiddleware.autorizar(['funcionario', 'admin']), controller.criar);
router.put('/:id', autenticar, AutorizacaoMiddleware.autorizar(['funcionario', 'admin']), controller.atualizar);
router.delete('/:id', autenticar, AutorizacaoMiddleware.autorizar(['funcionario', 'admin']), controller.deletar);
router.delete('/', autenticar, AutorizacaoMiddleware.autorizar(['funcionario', 'admin']), controller.deletarTodas);

module.exports = router;




