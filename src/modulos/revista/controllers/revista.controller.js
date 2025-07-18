const Revista = require('../models/revista.model');

const listarRevistas = async (req, res) => {
  try {
    const revistas = await Revista.findAll();
    return res.status(200).json(revistas);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao listar revistas.' });
  }
};

const detalharRevista = async (req, res) => {
  const { id } = req.params;
  try {
    const revista = await Revista.findByPk(id);
    if (!revista) {
      return res.status(404).json({ erro: 'Revista não encontrada.' });
    }
    return res.status(200).json(revista);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao buscar a revista.' });
  }
};

const criarRevista = async (req, res) => {
  const { nome, descricao, categoria, status } = req.body;
  try {
    const novaRevista = await Revista.create({ nome, descricao, categoria, status });
    return res.status(201).json(novaRevista);
  } catch (error) {
    console.error('Erro ao criar revista:', error); // Adicione isto!
    return res.status(400).json({ erro: 'Erro ao criar revista.' });
  }
};


const atualizarRevista = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, categoria, status } = req.body;
  try {
    const revista = await Revista.findByPk(id);
    if (!revista) {
      return res.status(404).json({ erro: 'Revista não encontrada.' });
    }
    await revista.update({ nome, descricao, categoria, status });
    return res.status(200).json(revista);
  } catch (error) {
    return res.status(400).json({ erro: 'Erro ao atualizar revista.' });
  }
};
const excluirRevista = async (req, res) => {
  try {
    await Revista.destroy({ where: {}, truncate: true });
    return res.status(200).json({ msg: 'Todas as revistas foram excluídas.' });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao excluir revistas.' });
  }
};


module.exports = {
  listarRevistas,
  detalharRevista,
  criarRevista,
  atualizarRevista,
  excluirRevista,
};
