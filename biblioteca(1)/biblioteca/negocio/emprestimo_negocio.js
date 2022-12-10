const emprestimoPersistencia = require('../persistencia/emprestimo_persistencia.js')   // Importa funcionalides de PERSISTÊNCIA
const livroPersistencia = require('../persistencia/livro_persistencia.js')   // Importa funcionalides de PERSISTÊNCIA
const usuariosPersistencia = require('../persistencia/usuario_persistencia.js')   // Importa funcionalides de PERSISTÊNCIA


async function inserir (emprestimo) {                      // Funcionalidade INSERIR (exportada indiretamente)
    if(emprestimo && emprestimo.livro && emprestimo.usuario){
        const contaLivrosAlugados   = await livroPersistencia.verificaLivroDisponivel(emprestimo.livro);
        const qtdLivrosAlugados     = await livroPersistencia.qtdLivrosAlugados(emprestimo.livro);
        const qtdLivrosUsuario      = await usuariosPersistencia.qtdLivrosAlugados(emprestimo.usuario);
        console.log(contaLivrosAlugados);
        console.log(qtdLivrosAlugados);
        console.log(qtdLivrosUsuario);

        if (qtdLivrosAlugados.quantidade >= contaLivrosAlugados.count ){
            console.log('PAssou na primeira regra');
            // Compara a quantidade de livros alugados, com a qtd total de livros
            if (+qtdLivrosUsuario.count  <= 3 ){
                console.log('Passou na segunda regra');
                // Verifica a quantidade de livros alugados pelo usuario
                const emprestimoInserido = await emprestimoPersistencia.inserir(emprestimo);
                return emprestimoInserido
            }else{
                const erro = { 
                    mensagem: "Usuario com o limite de livros atingido!",
                    numero: 400
                };
                throw erro;
            }
        }else{
            const erro = { 
                mensagem: "Sem exemplares disponiveis!",
                numero: 400
            };
            throw erro;
        }

    }
    else {
        const erro = { 
            mensagem: "Campo livro ou usuario vazio(s)!",
            numero: 400
        };
        throw erro;
    }
}  


async function listar () {                                // Funcionalidade LISTAR (exportada indiretamente)
    return await emprestimoPersistencia.listar();
}

async function buscarPorId(id){                         // Funcionalidade BUSCAR_POR_ID (exportada indiretamente)
    if(!id || isNaN(id)){
        const erro = { 
            mensagem: "Identificador Invalido!",
            numero: 400
        }
        throw erro;
    }
    else { 
        const testaId = await emprestimoPersistencia.validaId(id);
        if (!testaId){
            // Evita de mandar pro banco uma requisão inutil
            // TestaId, caso o retorno da query não é vazio, o elemento existe
            // Se o elemento não existe, retorna falso.
            const retorno = await emprestimoPersistencia.buscarPorId(id);
            return retorno;
        }else{
            const erro = { 
                mensagem: "Identificador Não encontrado!",
                numero: 400
            }
            throw erro;
        }
    }
}


async function atualizar(id, emprestimo) {                 // Funcionalidade ATUALIZAR (exportada indiretamente)
    if(!id || isNaN(id)){
        const erro = { 
            mensagem: "Identificador Invalido!",
            numero: 400
        }
        throw erro;
    }
    else if(!emprestimo || !emprestimo.livro || !emprestimo.usuario || !emprestimo.data_emprestimo || !emprestimo.data_devolucao) {
        const erro = { 
            mensagem: "Os campos livro, usuario, data emprestimo ou data devolução devem ser preenchido(s)",
            numero: 400
        };
        throw erro;
    }
    else { 
        const testaId = await emprestimoPersistencia.validaId(id);
        if (testaId){ 
        const atualizaemprestimo = await emprestimoPersistencia.atualizar(id, emprestimo);
        return atualizaemprestimo;
        } else{
            const erro = { 
                mensagem: "Emprestimo Não encontrado!",
                numero: 400
            }
            throw erro;
        }
    }

}

async function deletar(id){ 
    if(!id || isNaN(id)){
        const erro = { 
            mensagem: "Emprestimo Invalido!",
            numero: 400
        }
        throw erro;
    }
    else { 
        const testaId = await emprestimoPersistencia.validaId(id);
        if (!testaId){
            const retorno = await emprestimoPersistencia.deletar(id);
            return retorno;
        }else{
            const erro = { 
                mensagem: "Emprestimo não existe!",
                numero: 400
            };
            throw erro;

        }
    }
}





module.exports = {
    inserir, listar,buscarPorId, atualizar, deletar      // Exporta funcionalidades para CONTROLLER
}