const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

// Criar um novo usuário
async function criarUsuario(req, res) {
  const { email, senha, papel } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    const senhaHash = await bcryptjs.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      email,
      senha: senhaHash,
      papel: papel || 'usuario', // papel padrão
    });

    return res.status(201).json({
      mensagem: 'Usuário criado com sucesso',
      usuario: {
        id: novoUsuario.id,
        email: novoUsuario.email,
        papel: novoUsuario.papel,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}

// Login de usuário
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
      {
        id: usuario.id,
        email: usuario.email,
        papel: usuario.papel,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: 'Erro no login' });
  }
}

// Listar todos os usuários (rota protegida)
async function listarUsuarios(req, res) {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ['id', 'email', 'papel'],
    });
    return res.json(usuarios);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao listar usuários' });
  }
}

// Retornar dados do usuário logado (perfil)
async function perfilUsuario(req, res) {
  try {
    const { id, email, papel } = req.usuario; // dados do token JWT
    return res.json({ id, email, papel });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao obter perfil do usuário' });
  }
}

module.exports = {
  criarUsuario,
  login,
  listarUsuarios,
  perfilUsuario,
};
