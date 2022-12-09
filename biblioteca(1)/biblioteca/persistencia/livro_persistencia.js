const {Client} = require('pg');         // Importa dados do BANCO DADOS

const erroBD = { 
    mensagem: "Erro de conexao com BD",
    numero: 500
};

const erroLivroNaoEncontrado = {
    mensagem: "Livro nao encontrado",
    numero:404
};

const conexao = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'X4m0d3k@',
    database: 'crud_produtos'
};


function inserir(livro, callback) {                                                   // Funcionalidade INSERIR (exportada indiretamente)
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "INSERT INTO biblioteca.livros(nome, autor, ano, quantidade) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [livro.nome, livro.autor, livro.ano, livro.quantidade];

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
    
    const sql = "SELECT * FROM biblioteca.livros ORDER BY id";
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
    
    const sql = "SELECT * FROM biblioteca.livros WHERE id=$1";
    const values = [id];

    cliente.query(sql, values,
        function (err, res) {
            if(err) {
                console.log(err);
                callback(erroBD, undefined);                
            }
            else if (res.rows && res.rows.length > 0) {
                let livro = res.rows[0];
                callback(undefined, livro);
            }
            else {
                callback(erroLivroNaoEncontrado, undefined);
            }

            cliente.end();
        }
    )    
}


function atualizar(id, livro, callback) {                                              // Funcionalidade ATUALIZAR (exportada indiretamente)
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "UPDATE biblioteca.livros SET nome=$1, autor=$2, ano=$3, quantidade=$4 WHERE id=$5 RETURNING *"    
    const values = [livro.nome, livro.autor, livro.ano, livro.quantidade, id];

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
            callback(erroLivroNaoEncontrado, undefined);
        }

        cliente.end();        
    })
}


function deletar(id, callback) {                                                        // Funcionalidade DELETAR (exportada indiretamente)
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "DELETE FROM biblioteca.livros WHERE id=$1 RETURNING *"
    const values = [id];

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
            callback(erroLivroNaoEncontrado, undefined);
    }

        cliente.end();        
    })
}


function qtdLivros(id, callback) {                                                        // Funcionalidade DELETAR (exportada indiretamente)
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "select quantidade from crud_produtos.biblioteca.livros where id = $1"
    const values = [id];

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
            callback(erroLivroNaoEncontrado, undefined);
    }

        cliente.end();        
    })
}

function verificaLivroExiste(id, callback){                                                    // Funcionalidade BUSCAR_POR_ID (exportada indiretamente)
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "SELECT id FROM biblioteca.emprestimos WHERE id=$1 ;";
    const values = [id];

    cliente.query(sql, values,
        function (err, res) {
            if(err) {
                console.log(err);
                callback(erroBD, undefined);                
            }
            else if (res.rows && res.rows.length > 0) {
                let retorno =  res.rows[0];
                callback(undefined, retorno);
            }
            else {
                callback(erroLivroNaoEncontrado, undefined);
            }
            cliente.end();
        }
    )    
}



module.exports = {
    inserir, listar, buscarPorId, atualizar, deletar, qtdLivros,verificaLivroExiste                     // Exporta funcionalidades para NEGOCIO
}