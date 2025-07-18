class AutorizacaoMiddleware {
    
  static autorizar(papeisPermitidos) {
    return (req, res, next) => {
      const usuario = req.usuario;
        console.log('Usuário logado:', usuario); // Veja o papel aqui
        console.log('Papéis permitidos:', papeisPermitidos);
  
      if (!usuario || !papeisPermitidos.includes(usuario.papel)) {
        return res.status(403).json({ msg: "Acesso não autorizado para este recurso!" });
      }

      next();
    };
  }
}

module.exports = AutorizacaoMiddleware;

  