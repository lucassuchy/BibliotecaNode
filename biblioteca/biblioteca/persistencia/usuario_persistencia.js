const {Client} = require('pg');         // Importa dados do BANCO DADOS

const erroBD = { 
    mensagem: "Erro de conexao com BD",
    numero: 500
};

const erroLivroNaoEncontrado = {
    mensagem: "Usuario nao encontrado",
    numero: 404
};

const conexao = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'X4m0d3k@',
    database: 'crud_produtos'
};


function inserir(usuario, callback) {                                                   // Funcionalidade INSERIR (exportada indiretamente)
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "INSERT INTO biblioteca.usuarios(nome, telefone, email, cidade, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [usuario.nome, usuario.telefone, usuario.email, usuario.cidade, usuario.estado];

    cliente.query(sql, values, 
        function (err, res){
            if(err){
                console.log(err);
                callback(erroBD, undefined);
            }
            else {
                callback(undefined, res.rows[0]);
            }
            cliente.end();
        })

}


function listar(callback) {                                                             // Funcionalidade LISTAR (exportada indiretamente)
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "SELECT * FROM biblioteca.usuarios ORDER BY id";
    cliente.query(sql, 
        function (err, res) {
            if(err) {
                console.log(err);
                callback(erroBD, undefined);
            }
            else {
                let livros = res.rows;
                callback(undefined, livros);     
            }
            cliente.end();
        }
    )    
}


function buscarPorId(id, callback){                                                    // Funcionalidade BUSCAR_POR_ID (exportada indiretamente)
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "SELECT * FROM biblioteca.usuarios WHERE id=$1";
    const values = [id];

    cliente.query(sql, values,
        function (err, res) {
            if(err) {
                console.log(err);
                callback(erroBD, undefined);                
            }
            else if (res.rows && res.rows.length > 0) {
                let usuario = res.rows[0];
                callback(undefined, usuario);
            }
            else {
                callback(erroUsuarioNaoEncontrado, undefined);
            }

            cliente.end();
        }
    )    
}


function atualizar(id, usuario, callback) {                                              // Funcionalidade ATUALIZAR (exportada indiretamente)
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "UPDATE biblioteca.usuarios SET nome=$1, telefone=$2, email=$3, cidade=$4, estado=$5 WHERE id=$6 RETURNING *"    
    const values = [usuario.nome, usuario.telefone, usuario.email, usuario.cidade, usuario.estado, id];

    cliente.query(sql, values, function(err, res) {
        if(err) {
            console.log(err);
            callback(erroBD, undefined);                
        }
        else if (res.rows && res.rows.length > 0) {
            let livro = res.rows[0];
            callback(undefined, livro);
        }
        else {
            callback(erroUsuarioNaoEncontrado, undefined);
        }

        cliente.end();        
    })
}


function deletar(id, callback) {                                                        // Funcionalidade DELETAR (exportada indiretamente)
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "DELETE FROM biblioteca.usuarios WHERE id=$1 RETURNING *"
    const values = [id];

    cliente.query(sql, values, function(err, res) {
        if(err) {
            console.log(err);
            callback(erroBD, undefined);                
    }
        else if (res.rows && res.rows.length > 0) {
            let usuario = res.rows[0];
            callback(undefined, usuario);
        }
        else {
            callback(erroUsuarioNaoEncontrado, undefined);
    }

        cliente.end();        
    })
}


module.exports = {
    inserir, listar, buscarPorId, atualizar, deletar                     // Exporta funcionalidades para NEGOCIO
}