const emprestimoPersistencia = require('../persistencia/emprestimo_persistencia.js')   // Importa funcionalides de PERSISTÊNCIA
const livroPersistencia = require('../persistencia/livro_persistencia.js')   // Importa funcionalides de PERSISTÊNCIA


function inserir (emprestimo, callback) {                      // Funcionalidade INSERIR (exportada indiretamente)
    let existe = livroPersistencia.verificaLivroExiste(emprestimo.livro,callback);
    console.log(existe);
    // console.log('aa');
    let qtdEmprestimos = emprestimoPersistencia.verificaQtdEmprestimosCliente(emprestimo.usuario, callback);
    console.log(qtdEmprestimos);
    // if(!emprestimo || !emprestimo.livro || !emprestimo.usuario){
    //         const erro = { 
    //             mensagem: "Campo livro ou usuario vazio(s)!",
    //             numero: 400
    //         };
    //         callback(erro, undefined)
    // }
    // else {
    //     // Verifica se o livro do brother existe
    //     if(existe){
    //         console.log('chegou aqui')
    //         if ((qtdEmprestimos) <= 3){
    //             emprestimoPersistencia.inserir(emprestimo, callback);
    //         }
    //         else{
    //             const erro = { 
    //                 mensagem: "Usuario com o limite de livros atingido",
    //                 numero: 501
    //             };
    //             callback(erro, undefined)

    //         }
    //     }else {
    //         const erro = { 
    //             mensagem: "Livro Não existe",
    //             numero: 501
    //         };
    //         callback(erro, undefined)
    //     }

    // }  
}


function listar (callback) {                                // Funcionalidade LISTAR (exportada indiretamente)
    emprestimoPersistencia.listar(callback);
}

function buscarPorId(id, callback){                         // Funcionalidade BUSCAR_POR_ID (exportada indiretamente)
    if(!id || isNaN(id)){
        const erro = { 
            mensagem: "Identificador Invalido!",
            numero: 400
        }
        callback(erro, undefined);
    }
    else { 
        emprestimoPersistencia.buscarPorId(id, callback);
    }
}


function atualizar(id, emprestimo, callback) {                 // Funcionalidade ATUALIZAR (exportada indiretamente)
    if(!id || isNaN(id)){
        const erro = { 
            mensagem: "Identificador Invalido!",
            numero: 400
        }
        callback(erro, undefined);
    }
    else if(!emprestimo || !emprestimo.livro || !emprestimo.usuario || !emprestimo.data_emprestimo || !emprestimo.data_devolucao) {
        const erro = { 
            mensagem: "Os campos livro, usuario, data emprestimo ou data devolução devem ser preenchido(s)",
            numero: 400
        };
        callback(erro, undefined)
    }
    else { 
        emprestimoPersistencia.atualizar(id, emprestimo, callback);
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