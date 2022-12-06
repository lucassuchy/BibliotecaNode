const usuarioPersistencia = require('../persistencia/usuario_persistencia.js')   // Importa funcionalides de PERSISTÊNCIA


function inserir (usuario, callback) {                      // Funcionalidade INSERIR (exportada indiretamente)
    if(!usuario || !usuario.nome || !usuario.telefone || !usuario.email || !usuario.cidade || !usuario.estado){
        const erro = { 
            mensagem: "Campo nome, telefone, email, cidade ou estado vazio(s)!",
            numero: 400
        };
        callback(erro, undefined)
    }
    else {
        usuarioPersistencia.inserir(usuario, callback);
    }  
}


function listar (callback) {                                // Funcionalidade LISTAR (exportada indiretamente)
    usuarioPersistencia.listar(callback);
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
        usuarioPersistencia.buscarPorId(id, callback);
    }
}


function atualizar(id, usuario, callback) {                 // Funcionalidade ATUALIZAR (exportada indiretamente)
    if(!id || isNaN(id)){
        const erro = { 
            mensagem: "Identificador Invalido!",
            numero: 400
        }
        callback(erro, undefined);
    }
    else if(!usuario || !usuario.nome || !usuario.telefone || !usuario.email || !usuario.cidade || !usuario.estado) {
        const erro = { 
            mensagem: "Os campos nome, telefone, email, cidade ou estado devem ser preenchido(s)!",
            numero: 400
        };
        callback(erro, undefined)
    }
    else { 
        usuarioPersistencia.atualizar(id, usuario, callback);
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
        usuarioPersistencia.deletar(id,callback);
    }
}


module.exports = {
    inserir, listar, buscarPorId, atualizar, deletar        // Exporta funcionalidades para CONTROLLER
}