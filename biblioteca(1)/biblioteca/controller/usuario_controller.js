const usuarioNegocio = require('../negocio/usuario_negocio');                 // Importa funcionalides de NEGOCIO


exports.inserir = async (req, res) => {                                         // Funcionalidade INSERIR (exportada diretamente)
  try {
  const usuario = req.body;
  usuarioNegocio.inserir(usuario);
  res.status(201).json(usuarioInserido);
  }catch(err){
    res.status(err.numero).json({erro: err.mensagem});
  }
}


exports.listar = async (req, res) => {                                          // Funcionalidade LISTAR (exportada diretamente)
  
  const listaUsers = await usuarioNegocio.listar();
  res.json(listaUsers);
}


exports.buscarPorId = async (req, res) => {                                     // Funcionalidade BUSCAR_POR_ID (exportada diretamente)
  const id = req.params.id;
  try {
    const usuario = await usuarioNegocio.buscarPorId(id);
    res.json(usuario);
  }catch(err){
    res.status(err.numero).json({erro: err.mensagem});
  }
}


exports.atualizar = async (req, res) => {                                       // Funcionalidade ATUALIZAR (exportada diretamente)
    
  const id = req.params.id;
  const usuario = req.body;
  try{
    usuarioNegocio.atualizar(id, usuario)
    res.json(usuarioAlterado);

  }catch(err){
    res.status(err.numero).json({erro: err.mensagem});
  }
}


exports.deletar = async (req, res) => {                                         // Funcionalidade DELETAR (exportada diretamente)
  
  const id = req.params.id;
  try{
    const usuarioDeletado = await   usuarioNegocio.deletar(id)

  }catch(err){
    res.status(err.numero).json({erro: err.mensagem});
  }
}