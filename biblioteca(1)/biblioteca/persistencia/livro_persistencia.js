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


async function inserir(livro) {                                                   // Funcionalidade INSERIR (exportada indiretamente)
    const cliente = new Client(conexao);
    await cliente.connect();
    const sql = "INSERT INTO biblioteca.livros(nome, autor, ano, quantidade) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [livro.nome, livro.autor, livro.ano, livro.quantidade];
    const res = await cliente.query(sql, values)
    await cliente.end();
    return res.rows[0];

}


async function listar() {                                                             // Funcionalidade LISTAR (exportada indiretamente)
    const cliente = new Client(conexao);
    await cliente.connect();
    
    const sql = `SELECT * FROM biblioteca.livros ORDER BY id`;
    const rest = await cliente.query(sql);
    let retornoQuery = rest.rows.map(function(linha) {
        return {
                id: linha.id,                
                nome: linha.nome,
                autor:   linha.autor,
                ano: linha.ano,
                quantidade: linha.quantidade
                }
        
    })
    await cliente.end();
    return retornoQuery
}


async function buscarPorId(id){                                                    // Funcionalidade BUSCAR_POR_ID (exportada indiretamente)
    const cliente = new Client(conexao);
    await cliente.connect();
    const sql = "SELECT * FROM biblioteca.livros WHERE id=$1";
    const values = [id];
    const query = await cliente.query(sql, values);
    await cliente.end();
    return query.rows[0];  
}


async function atualizar(id, livro) {                                              // Funcionalidade ATUALIZAR (exportada indiretamente)
    const cliente = new Client(conexao);
    await cliente.connect();
    const sql = `UPDATE biblioteca.livros 
                  SET nome=$1
                , autor=$2
                , ano=$3
                , quantidade=$4 
                WHERE id=$5 RETURNING *`
    const values = [livro.nome
                    , livro.autor
                    , livro.ano
                    , livro.quantidade
                    , id];
    const query = await cliente.query(sql, values)
    await cliente.end()
    let retorno = query.rows[0];
    return retorno;
}


async function deletar(id) {                                                        // Funcionalidade DELETAR (exportada indiretamente)
    const cliente = new Client(conexao);
    await cliente.connect();
    const sql = "DELETE FROM biblioteca.livros WHERE id=$1 RETURNING *";
    const values = [id];
    const query = await cliente.query(sql, values);
    await cliente.end();
    let retorno = query.rows[0];
    return retorno;
    }

async function qtdLivrosAlugados(id) {                                                        // Funcionalidade DELETAR (exportada indiretamente)
    const cliente = new Client(conexao);
    await cliente.connect();
    const sql = `select coalesce(
        (SELECT count(*) 
        FROM biblioteca.emprestimos
        where id_livro = $1
        and data_retorno is null 
        group by id_livro)
        ,0) as quantidade`;
    const values = [id];
    const query = await cliente.query(sql, values);
    await cliente.end();
    let retorno = query.rows[0];
    return retorno;
    }

async function validaId(id){ 
        const cliente = new Client(conexao);
        await cliente.connect();
        const sql = "SELECT id FROM biblioteca.livros WHERE id=$1";
        const values = [id];
        const query = await cliente.query(sql, values);
        await cliente.end();
        if (query.rows[0] == 'undefined' ){
            return false
        }else{
            return true
        }
    }

async function verificaLivroDisponivel(id) {                                                        // Funcionalidade DELETAR (exportada indiretamente)
        const cliente = new Client(conexao);
        await cliente.connect();
        const sql = `SELECT quantidade  
                    FROM biblioteca.livros 
                    where id = $1;`;
        const values = [id];
        const query = await cliente.query(sql, values);
        await cliente.end();
        let retorno = query.rows[0];
        return retorno;
        }

module.exports = {
    inserir
    , listar
    , buscarPorId
    , atualizar
    , deletar
    ,verificaLivroDisponivel
    ,qtdLivrosAlugados 
    ,validaId                   // Exporta funcionalidades para NEGOCIO
}