const emprestimoNegocio = require('../negocio/emprestimo_negocio');                 // Importa funcionalides de NEGOCIO

exports.inserir = async (req, res) => {
	try {
	const emprestimo = req.body;
	console.log(req.body);
	const inseriEmprestimo = await emprestimoNegocio.inserir(emprestimo) 
	res.json(inseriEmprestimo)
	} catch (err){
		res.status(err.numero).json({erro: err.mensagem});
	}
}

exports.listar = async (req, res) => {                                          // Funcionalidade LISTAR (exportada diretamente)
	const listaEmprestimos = await emprestimoNegocio.listar();
	res.json(listaEmprestimos);
  }

//Adicionar busca por id de user 
// Adicionar busca por id de livro
exports.buscarPorId = async (req, res ) => {
	const id = req.params.id;
	try {
		const resultadoBusca = await emprestimoNegocio.buscarPorId(id);
		res.json(resultadoBusca);
	}catch (err){
		res.status(err.numero).json({erro: err.mensagem});
	}
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