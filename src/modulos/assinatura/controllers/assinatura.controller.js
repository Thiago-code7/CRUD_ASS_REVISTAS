const { Assinatura } = require('../models');

module.exports = {
  async listar(req, res) {
    const lista = await Assinatura.findAll();
    res.json(lista);
  },

  async buscar(req, res) {
    const { id } = req.params;
    const assinatura = await Assinatura.findByPk(id);
    if (!assinatura) return res.status(404).json({ erro: 'Não encontrada' });
    res.json(assinatura);
  },

  async criar(req, res) {
    const nova = await Assinatura.create(req.body);
    res.status(201).json(nova);
  },

  async atualizar(req, res) {
    const { id } = req.params;
    const assinatura = await Assinatura.findByPk(id);
    if (!assinatura) return res.status(404).json({ erro: 'Não encontrada' });

    await assinatura.update(req.body);
    res.json(assinatura);
  },

  async deletar(req, res) {
    const { id } = req.params;
    const assinatura = await Assinatura.findByPk(id);
    if (!assinatura) return res.status(404).json({ erro: 'Não encontrada' });

    await assinatura.destroy();
    res.status(200).json({ mensagem: 'Assinatura excluída com sucesso!' });
  },

  async deletarTodas(req, res) {
    await Assinatura.destroy({ where: {} });
    res.status(200).json({ mensagem: 'Todas as assinaturas foram excluídas com sucesso!' });
  }
};
