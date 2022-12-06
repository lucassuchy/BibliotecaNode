const emprestimoNegocio = require('../negocio/emprestimo_negocio');                 // Importa funcionalides de NEGOCIO

exports.inserir = (req, res) => {
	
	const emprestimo = req.body;
	emprestimoNegocio.inserir(emprestimo, function (err, emprestimoRealizado) {
		if(err){
			res.status(err.numero).json({erro: err.mensagem});
		}
		else{
			res.status(201).json(emprestimoRealizado);
		}
	});
}

exports.listar = (req, res) => {                                          // Funcionalidade LISTAR (exportada diretamente)
  
	emprestimoNegocio.listar(function (err, emprestimos) {                     
	  if(err) {
		res.status(err.numero).json({erro: err.mensagem});
	  }
	  else {
		res.json(emprestimos);
	  }
	});
  
  }

//Adicionar busca por id de user 
// Adicionar busca por id de livro
exports.buscarPorId = (req, res ) => {

	const id = req.params.id;
	emprestimoNegocio.buscarPorId(id, function (err, emprestimo){
		if(err){
			res.status(err.numero).json({erro: err.mensagem});
		}
		else {
			res.json(emprestimo);
		}
	});
}

exports.atualizar = (req, res) => {
	const id = req.params.id;
	const emprestimo = req.body;
	emprestimoNegocio.atualizar(id, emprestimo, function (err, emprestimoAlterado) {
		if(err){
			res.status(err.numero).json({erro: err.mensagem});
		}
		else {
			res.json(emprestimoAlterado);
		}
	});
}

exports.deletar = (req, res) => {

	const id = req.params.id;
	emprestimoNegocio.deletar(id, function (err,emprestimo) {
		if(err){
			res.status(err.numero).json({erro: err.mensagem})
		}
		else{res.json(emprestimo)}
	})
}