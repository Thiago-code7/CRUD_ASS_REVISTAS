const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const controller = require('../controllers/assinatura.controller');

router.get('/', auth, controller.listar);
router.get('/:id', auth, controller.buscar);
router.post('/', auth, controller.criar);
router.put('/:id', auth, controller.atualizar);
router.delete('/:id', auth, controller.deletar);

module.exports = router;

