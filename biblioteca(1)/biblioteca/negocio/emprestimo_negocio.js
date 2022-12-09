const emprestimoPersistencia = require('../persistencia/emprestimo_persistencia.js')   // Importa funcionalides de PERSISTÊNCIA
const livroPersistencia = require('../persistencia/livro_persistencia.js')   // Importa funcionalides de PERSISTÊNCIA


async function inserir (emprestimo) {                      // Funcionalidade INSERIR (exportada indiretamente)
    console.log(emprestimo);
    if(emprestimo && emprestimo.livro && emprestimo.usuario){
        const emprestimoInserido = await emprestimoPersistencia.inserir(emprestimo);
        return emprestimoInserido
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
        if (testaId){
            // Evita de mandar pro banco uma requisão inutil
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
                mensagem: "Identificador Não encontrado!",
                numero: 400
            }
            throw erro;
        }
    }

}

function deletar(id, callback) {                            // Funcionalidade DELETAR (exportada indiretamente)
    if(!id || isNaN(id)){
        const erro = { 
            mensagem: "Identificador Invalido!",
            numero: 400
        }
        callback(erro, undefined);
    }
    else {
        emprestimoPersistencia.deletar(id,callback);
    }
}


function verificaLivroDisponivel(id, callback) {                            // Funcionalidade DELETAR (exportada indiretamente)
    if(!id || isNaN(id)){
        const erro = { 
            mensagem: "Livro Não Existe!",
            numero: 501
        }
        callback(erro, undefined);
    }
    else {
        emprestimoPersistencia.verificaLivroDisponivel(id,callback);
    }
}

module.exports = {
    inserir, listar,buscarPorId, atualizar, deletar,verificaLivroDisponivel      // Exporta funcionalidades para CONTROLLER
}