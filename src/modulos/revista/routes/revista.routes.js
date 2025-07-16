const express = require('express');
const router = express.Router();
const revistaController = require('../controllers/revista.controller');
const autenticar = require('../../../middlewares/autenticacao.middleware');
const autorizar = require('../../../middlewares/autorizacao.middleware');

// Rotas protegidas
router.get('/', autenticar, autorizar('assinante', 'funcionario', 'admin'), revistaController.listarRevistas);
router.get('/:id', autenticar, autorizar('assinante', 'funcionario', 'admin'), revistaController.detalharRevista);
router.post('/', autenticar, autorizar('funcionario', 'admin'), revistaController.criarRevista);
router.put('/:id', autenticar, autorizar('funcionario', 'admin'), revistaController.atualizarRevista);
router.delete('/:id', autenticar, autorizar('funcionario', 'admin'), revistaController.excluirRevista);

module.exports = router;




