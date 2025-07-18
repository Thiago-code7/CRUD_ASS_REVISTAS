// src/middlewares/autenticacao.middleware.js
const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ msg: 'Token de acesso não fornecido!' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ msg: 'Token inválido ou expirado!' });
    }

    req.usuario = usuario;
    next();
  });
}

module.exports = { autenticarToken };
