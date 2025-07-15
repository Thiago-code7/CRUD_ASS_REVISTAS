const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

async function criarUsuario(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    const senhaHash = await bcryptjs.hash(senha, 10);
    const novoUsuario = await Usuario.create({
      email,
      senha: senhaHash,
    });

    return res.status(201).json({
      mensagem: 'Usuário criado com sucesso',
      usuario: { email: novoUsuario.email },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}

async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const senhaCorreta = await bcryptjs.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: 'Erro no login' });
  }
}

module.exports = { criarUsuario, login };



