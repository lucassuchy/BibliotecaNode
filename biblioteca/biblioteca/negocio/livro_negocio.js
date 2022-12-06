const livroPersistencia = require('../persistencia/livro_persistencia.js')   // Importa funcionalides de PERSISTÊNCIA


function inserir (livro, callback) {                      // Funcionalidade INSERIR (exportada indiretamente)
    if(!livro || !livro.nome || !livro.autor || !livro.ano || !livro.quantidade){
        const erro = { 
            mensagem: "Campo nome, autor, ano ou quantidade vazio(s)!",
            numero: 400
        };
        callback(erro, undefined)
    }
    else {
        livroPersistencia.inserir(livro, callback);
    }  
}


function listar (callback) {                                // Funcionalidade LISTAR (exportada indiretamente)
    livroPersistencia.listar(callback);
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
        livroPersistencia.buscarPorId(id, callback);
    }
}


function atualizar(id, livro, callback) {                 // Funcionalidade ATUALIZAR (exportada indiretamente)
    if(!id || isNaN(id)){
        const erro = { 
            mensagem: "Identificador Invalido!",
            numero: 400
        }
        callback(erro, undefined);
    }
    else if(!livro || !livro.nome || !livro.autor || !livro.ano || !livro.quantidade) {
        const erro = { 
            mensagem: "Os campos nome, autor, ano ou quantidade devem ser preenchido(s)",
            numero: 400
        };
        callback(erro, undefined)
    }
    else { 
        livroPersistencia.atualizar(id, livro, callback);
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
        livroPersistencia.deletar(id,callback);
    }
}


module.exports = {
    inserir, listar, buscarPorId, atualizar, deletar        // Exporta funcionalidades para CONTROLLER
}