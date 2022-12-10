const usuarioPersistencia = require('../persistencia/usuario_persistencia.js')   // Importa funcionalides de PERSISTÊNCIA


async function inserir (usuario) {                      // Funcionalidade INSERIR (exportada indiretamente)
    if(!usuario || !usuario.nome || !usuario.telefone || !usuario.email || !usuario.cidade || !usuario.estado){
        const erro = { 
            mensagem: "Campo nome, telefone, email, cidade ou estado vazio(s)!",
            numero: 400
        };
        throw erro;
    }
    else {
        const novoUser = await usuarioPersistencia.inserir(usuario);
        return novoUser;
    }  
}


async function listar () {                                // Funcionalidade LISTAR (exportada indiretamente)
    return await usuarioPersistencia.listar();
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
        return await usuarioPersistencia.buscarPorId(id);
    }
}


async function atualizar(id, usuario) {                 // Funcionalidade ATUALIZAR (exportada indiretamente)
    if(!id || isNaN(id)){
        const erro = { 
            mensagem: "Identificador Invalido!",
            numero: 400
        }
        throw erro;
    }
    else if(!usuario || !usuario.nome || !usuario.telefone || !usuario.email || !usuario.cidade || !usuario.estado) {
        const erro = { 
            mensagem: "Os campos nome, telefone, email, cidade ou estado devem ser preenchido(s)!",
            numero: 400
        };
        throw erro;
    }
    else { 
        return await usuarioPersistencia.atualizar(id, usuario);
    }

}

async function deletar(id) {                            // Funcionalidade DELETAR (exportada indiretamente)
    if(!id || isNaN(id)){
        const erro = { 
            mensagem: "Identificador Invalido!",
            numero: 400
        }
        throw erro;
    }
    else {
        return await usuarioPersistencia.deletar(id);
    }
}


module.exports = {
    inserir, listar, buscarPorId, atualizar, deletar        // Exporta funcionalidades para CONTROLLER
}