const livroNegocio = require('../negocio/livro_negocio');                 // Importa funcionalides de NEGOCIO


exports.inserir = (req, res) => {                                         // Funcionalidade INSERIR (exportada diretamente)
  
  const livro = req.body;
  livroNegocio.inserir(livro, function(err, livroInserido) {  
    if(err){
      res.status(err.numero).json({erro: err.mensagem});
    }
    else {
      res.status(201).json(livroInserido);
    }
  }); 

}


exports.listar = (req, res) => {                                          // Funcionalidade LISTAR (exportada diretamente)
  
  livroNegocio.listar(function (err, livros) {                     
    if(err) {
      res.status(err.numero).json({erro: err.mensagem});
    }
    else {
      res.json(livros);
    }
  });

}


exports.buscarPorId = (req, res) => {                                     // Funcionalidade BUSCAR_POR_ID (exportada diretamente)
    
  const id = req.params.id;
    livroNegocio.buscarPorId(id, function (err, livro){                
      if(err) {
        res.status(err.numero).json({erro: err.mensagem});
      }
      else {
        res.json(livro);
      }
    });

}


exports.atualizar = (req, res) => {                                       // Funcionalidade ATUALIZAR (exportada diretamente)
    
  const id = req.params.id;
  const livro = req.body;
  livroNegocio.atualizar(id, livro, function(err, livroAlterado) {
    if(err){
      res.status(err.numero).json({erro: err.mensagem});
    }
    else {
      res.json(livroAlterado);
    }
  });

}


exports.deletar = (req, res) => {                                         // Funcionalidade DELETAR (exportada diretamente)
  
  const id = req.params.id;
  livroNegocio.deletar(id, function (err, livro) {                   
    if(err) {
      res.status(err.numero).json({erro: err.mensagem});
    }
    else {
      res.json(livro);
    }
  });

}