const emprestimoNegocio = require('../negocio/emprestimo_negocio');                 // Importa funcionalides de NEGOCIO

exports.inserir = async (req, res) => {
	try {
	const emprestimo = req.body;
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

exports.buscarPorId = async (req, res ) => {
	const id = req.params.id;
	try {
		const resultadoBusca = await emprestimoNegocio.buscarPorId(id);
		res.json(resultadoBusca);
	}catch (err){
		res.status(err.numero).json({erro: err.mensagem});
	}
}

exports.atualizar = async (req, res) => {
	const id = req.params.id;
	const emprestimo = req.body;
	try{
		const atualiza = await emprestimoNegocio.atualizar(id, emprestimo);
		res.json(atualiza);
	}catch(err){
		res.status(err.numero).json({erro: err.mensagem});
	}
}

exports.deletar = async (req, res) => {

	const id = req.params.id;
	try{ 
		const deletaEmprestimo = await emprestimoNegocio.deletar(id);
		res.json(deletaEmprestimo);
	}catch(err){
		console.log(err);
		res.status(err.numero).json({erro: err.mensagem});
	}
}