const path = require('path');
const express = require('express');
const router = express.Router();
const revistaController = require('../controllers/revista.controller');
const { autenticarToken } = require('../../../middlewares/autenticacao.middleware');
const autorizacaoMiddleware = require('../../../middlewares/autorizacao.middleware');

console.log('>> Caminho do controller:', path.resolve(__dirname, '../controllers/revista.controller'));
console.log('>> Propriedades do controller:', Object.keys(revistaController));

// Log para tipo da função excluirTodasRevistas
console.log('>> Tipo de excluirTodasRevistas:', typeof revistaController.excluirTodasRevistas);

// Validar se excluirTodasRevistas é função antes de usar na rota
if (typeof revistaController.excluirTodasRevistas !== 'function') {
  console.error('Erro: excluirTodasRevistas não é uma função válida no controller!');
}

const verificarFunc = (fn, nome) => {
  if (typeof fn !== 'function') {
    console.error(`Erro: Função ${nome} não encontrada ou não é uma função.`);
    return (req, res) => res.status(500).json({ erro: `Função ${nome} não implementada` });
  }
  return fn;
};

router.get(
  '/',
  autenticarToken,
  autorizacaoMiddleware.autorizar(['assinante', 'funcionario', 'admin']),
  verificarFunc(revistaController.listarRevistas, 'listarRevistas')
);
router.get(
  '/:id',
  autenticarToken,
  autorizacaoMiddleware.autorizar(['assinante', 'funcionario', 'admin']),
  verificarFunc(revistaController.detalharRevista, 'detalharRevista')
);
router.post(
  '/',
  autenticarToken,
  autorizacaoMiddleware.autorizar(['funcionario', 'admin']),
  verificarFunc(revistaController.criarRevista, 'criarRevista')
);
router.put(
  '/:id',
  autenticarToken,
  autorizacaoMiddleware.autorizar(['funcionario', 'admin']),
  verificarFunc(revistaController.atualizarRevista, 'atualizarRevista')
);
router.delete(
  '/',
  autenticarToken,
  autorizacaoMiddleware.autorizar(['funcionario', 'admin']),
  verificarFunc(revistaController.excluirTodasRevistas, 'excluirTodasRevistas')
);
router.delete(
  '/:id',
  autenticarToken,
  autorizacaoMiddleware.autorizar(['funcionario', 'admin']),
  verificarFunc(revistaController.excluirRevista, 'excluirRevista')
);

module.exports = router;
