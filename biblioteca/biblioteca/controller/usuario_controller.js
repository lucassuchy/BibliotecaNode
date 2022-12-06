const usuarioNegocio = require('../negocio/usuario_negocio');                 // Importa funcionalides de NEGOCIO


exports.inserir = (req, res) => {                                         // Funcionalidade INSERIR (exportada diretamente)
  
  const usuario = req.body;
  usuarioNegocio.inserir(usuario, function(err, usuarioInserido) {  
    if(err){
      res.status(err.numero).json({erro: err.mensagem});
    }
    else {
      res.status(201).json(usuarioInserido);
    }
  }); 

}


exports.listar = (req, res) => {                                          // Funcionalidade LISTAR (exportada diretamente)
  
  usuarioNegocio.listar(function (err, usuarios) {                     
    if(err) {
      res.status(err.numero).json({erro: err.mensagem});
    }
    else {
      res.json(usuarios);
    }
  });

}


exports.buscarPorId = (req, res) => {                                     // Funcionalidade BUSCAR_POR_ID (exportada diretamente)
    
  const id = req.params.id;
    usuarioNegocio.buscarPorId(id, function (err, usuario){                
      if(err) {
        res.status(err.numero).json({erro: err.mensagem});
      }
      else {
        res.json(usuario);
      }
    });

}


exports.atualizar = (req, res) => {                                       // Funcionalidade ATUALIZAR (exportada diretamente)
    
  const id = req.params.id;
  const usuario = req.body;
  usuarioNegocio.atualizar(id, usuario, function(err, usuarioAlterado) {
    if(err){
      res.status(err.numero).json({erro: err.mensagem});
    }
    else {
      res.json(usuarioAlterado);
    }
  });

}


exports.deletar = (req, res) => {                                         // Funcionalidade DELETAR (exportada diretamente)
  
  const id = req.params.id;
  usuarioNegocio.deletar(id, function (err, usuario) {                   
    if(err) {
      res.status(err.numero).json({erro: err.mensagem});
    }
    else {
      res.json(usuario);
    }
  });

}