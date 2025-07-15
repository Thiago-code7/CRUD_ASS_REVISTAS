const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// usuario.routes.js
router.post('/', usuarioController.criarUsuario);
router.post('/login', usuarioController.login);


module.exports = router;


