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


async function inserir(usuario) {                                                   // Funcionalidade INSERIR (exportada indiretamente)
    const cliente = new Client(conexao);
    await cliente.connect();

    const sql = "INSERT INTO biblioteca.usuarios(nome, telefone, email, cidade, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [usuario.nome, usuario.telefone, usuario.email, usuario.cidade, usuario.estado];

    const res = await cliente.query(sql, values)
    await cliente.end();
    return res.rows[0];

}


async function listar() {                                                             // Funcionalidade LISTAR (exportada indiretamente)
    const cliente = new Client(conexao);
    cliente.connect();
    const sql = "SELECT * FROM biblioteca.usuarios ORDER BY id";
    const rest = await cliente.query(sql);
    let retornoQuery = rest.rows.map(function(linha) {
        return {
                id: linha.id,                
                nome: linha.nome,
                telefone:   linha.email,
                cidade: linha.cidade,
                estado: linha.estado
                }
        
    })
    await cliente.end();
    return retornoQuery
}


async function buscarPorId(id){                                                    // Funcionalidade BUSCAR_POR_ID (exportada indiretamente)
    const cliente = new Client(conexao);
    await cliente.connect();
    
    const sql = "SELECT * FROM biblioteca.usuarios WHERE id=$1";
    const values = [id];
    const query = await cliente.query(sql, values);
    await cliente.end();
    return query.rows[0];  
}


async function atualizar(id, usuario) {                                              // Funcionalidade ATUALIZAR (exportada indiretamente)
    const cliente = new Client(conexao);
    cliente.connect();
    const sql = "UPDATE biblioteca.usuarios SET nome=$1, telefone=$2, email=$3, cidade=$4, estado=$5 WHERE id=$6 RETURNING *"    
    const values = [usuario.nome, usuario.telefone, usuario.email, usuario.cidade, usuario.estado, id];
    const query = await cliente.query(sql, values)
    await cliente.end()
    let retorno = query.rows[0];
    return retorno;
}

async function qtdLivrosAlugados(id) {                                                        // Funcionalidade DELETAR (exportada indiretamente)
    const cliente = new Client(conexao);
    await cliente.connect();
    const sql = `select coalesce((SELECT  count(*)
                FROM biblioteca.emprestimos
                where id_cliente  = $1
                and data_retorno is null 
                group by id_cliente),0) as count;`;
    const values = [id];
    const query = await cliente.query(sql, values);
    await cliente.end();
    let retorno = query.rows[0];
    return retorno;
    }

async function deletar(id) {                                                        // Funcionalidade DELETAR (exportada indiretamente)
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "DELETE FROM biblioteca.usuarios WHERE id=$1 RETURNING *"
    const values = [id];
    const query = await cliente.query(sql, values);
    await cliente.end();
    let retorno = query.rows[0];
    return retorno;
}


module.exports = {
    inserir, listar, buscarPorId, atualizar, deletar
    ,qtdLivrosAlugados
                         // Exporta funcionalidades para NEGOCIO
}