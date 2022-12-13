const livroPersistencia = require('../persistencia/livro_persistencia.js')   // Importa funcionalides de PERSISTÊNCIA


async function inserir (livro) {                      // Funcionalidade INSERIR (exportada indiretamente)
    if(!livro || !livro.nome || !livro.autor || !livro.ano || !livro.quantidade){
        const erro = { 
            mensagem: "Campo nome, autor, ano ou quantidade vazio(s)!",
            numero: 400
        };
        throw erro;
    }
    else {
        const livroInserido = await livroPersistencia.inserir(livro);
        return livroInserido;
    }  
}


async function listar () {                                // Funcionalidade LISTAR (exportada indiretamente)
    return await livroPersistencia.listar();
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
        const testaId = await livroPersistencia.validaId(id);
        if (testaId){ 
            const retorno = await livroPersistencia.buscarPorId(id);
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


async function atualizar(id, livro) {                 // Funcionalidade ATUALIZAR (exportada indiretamente)
    if(!id || isNaN(id)){
        const erro = { 
            mensagem: "Identificador Invalido!",
            numero: 400
        }
        throw erro;
    }
    else if(!livro || !livro.nome || !livro.autor || !livro.ano || !livro.quantidade) {
        const erro = { 
            mensagem: "Os campos nome, autor, ano ou quantidade devem ser preenchido(s)",
            numero: 400
        };
        throw erro;
    }
    else { 
        const livroAtualizado = await livroPersistencia.atualizar(id, livro);
        return livroAtualizado;
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
        const livroDeletado = livroPersistencia.deletar(id);
        return livroDeletado;
    }
}

module.exports = {
    inserir, listar, buscarPorId, atualizar, deletar        // Exporta funcionalidades para CONTROLLER
}