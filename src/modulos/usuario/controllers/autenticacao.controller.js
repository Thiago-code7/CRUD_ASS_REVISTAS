const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario.model");
const bcryptjs = require("bcryptjs");

async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    const senhaValida = await bcryptjs.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, papel: usuario.papel }, // adiciona papel aqui
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}

module.exports = { login };
