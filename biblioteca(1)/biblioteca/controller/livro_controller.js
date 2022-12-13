const livroNegocio = require('../negocio/livro_negocio');                 // Importa funcionalides de NEGOCIO


exports.inserir = async (req, res) => {                                         // Funcionalidade INSERIR (exportada diretamente)
  try {
    const livro = req.body;
    const livroInserido = await livroNegocio.inserir(livro);
    res.status(201).json(livroInserido);
  }catch(err){
    res.status(err.numero).json({erro: err.mensagem});
  }
}


exports.listar = async (req, res) => {                                          // Funcionalidade LISTAR (exportada diretamente)
	const listaEmprestimos = await livroNegocio.listar();
	res.json(listaEmprestimos);
  }


exports.buscarPorId = async (req, res) => {                                     // Funcionalidade BUSCAR_POR_ID (exportada diretamente)
    const id = req.params.id;
    try {
      const busca = await livroNegocio.buscarPorId(id);
      res.json(busca);
    }catch(err){
      res.status(err.numero).json({erro: err.mensagem});
    }
}


exports.atualizar = async (req, res) => {                                       // Funcionalidade ATUALIZAR (exportada diretamente)
    
  const id = req.params.id;
  const livro = req.body;
  try {
    const atualiza = await livroNegocio.atualizar(id, livro)
    res.json(atualiza);
  }catch(err){
    res.status(err.numero).json({erro: err.mensagem});
  }
}


exports.deletar = async (req, res) => {                                         // Funcionalidade DELETAR (exportada diretamente)
  
  const id = req.params.id;
  try{
    const deletado = await livroNegocio.deletar(id)
    res.json(deletado);

  }catch(err){
    res.status(err.numero).json({erro: err.mensagem});
  }
}