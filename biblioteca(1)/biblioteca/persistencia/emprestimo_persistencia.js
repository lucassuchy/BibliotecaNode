const {Client} = require('pg');         // Importa dados do BANCO DADOS

const erroBD = { 
    mensagem: "Erro de conexao com BD",
    numero: 500
};

const erroEmprestimoNaoEncontrado = {
    mensagem: "Emprestimo nao encontrado",
    numero:404
};

const conexao = {
	host:'localhost',
	port:5432,
	database:'crud_produtos',
	user:'lucas',
	password:'lucas'
}

async function inserir(emprestimo) {                                                   // Funcionalidade INSERIR (exportada indiretamente)
    const cliente = new Client(conexao);
    await cliente.connect();
	// data devolução: hoje + 1 uma semana, podemos adicionar uma variavel pra tratar isso
    const data = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    const devolucao = new Date(Date.now() + (( 3600 * 1000 * 24) * 7)).toISOString().replace(/T/, ' ').replace(/\..+/, '')
    const sql = `INSERT INTO biblioteca.emprestimos
                (id_livro, id_cliente, data_emprestimo, data_devolucao, data_retorno)
                VALUES($1, $2, $3, $4, $5)
                RETURNING *;`
    const values = [emprestimo.livro, emprestimo.usuario,data,devolucao, null];
    const res = await cliente.query(sql, values)
    await cliente.end();
    return res.rows[0];
}

async function listar() {                                                             // Funcionalidade LISTAR (exportada indiretamente)
    const cliente = new Client(conexao);
    await cliente.connect();
    
    const sql = `select a.id,
                        b.nome as livro, 
                        c.nome as usuario, 
                        a.data_emprestimo, 
                        a.data_devolucao,
                        a.data_retorno 
                from crud_produtos.biblioteca.emprestimos a 
                inner join crud_produtos.biblioteca.livros b on a.id_livro  = b.id  
                inner join crud_produtos.biblioteca.usuarios c on a.id_cliente  = c.id order by id`;
    const rest = await cliente.query(sql);
    let retornoQuery = rest.rows.map(function(linha) {
        return {
                id: linha.id,                
                usuario: linha.usuario,
                livro:   linha.livro,
                data_emprestimo: linha.data_emprestimo,
                data_devolucao: linha.data_devolucao,
                data_retorno: linha.data_retorno      
        }
        
    })
    await cliente.end();
    return retornoQuery;
}

async function buscarPorId(id){                                                    // Funcionalidade BUSCAR_POR_ID (exportada indiretamente)
    const cliente = new Client(conexao);
    await cliente.connect();
    const sql = "SELECT * FROM biblioteca.emprestimos WHERE id=$1";
    const values = [id];
    const query = await cliente.query(sql, values);
    await cliente.end();
    return query.rows[0];  
}

async function validaId(id){ 
    const cliente = new Client(conexao);
    await cliente.connect();
    const sql = "SELECT id FROM biblioteca.emprestimos WHERE id=$1";
    const values = [id];
    const query = await cliente.query(sql, values);
    await cliente.end();
    if (query.rows[0] == 'undefined' ){
        return false
    }else{
        return true
    }
}

async function atualizar(id, emprestimo) {                                              // Funcionalidade ATUALIZAR (exportada indiretamente)
    const cliente = new Client(conexao);
    await cliente.connect();

    const sql = `UPDATE biblioteca.emprestimos 
                 SET id_livro=$1, id_cliente=$2
                ,data_emprestimo=$3
                ,data_devolucao=$4 
                WHERE id=$5 RETURNING *`;
    const values = [emprestimo.livro
                    , emprestimo.usuario
                    , emprestimo.data_emprestimo
                    , emprestimo.data_devolucao
                    , id];
    const query = await cliente.query(sql, values)
    await cliente.end()
    let retorno = query.rows[0];
    return retorno;
}


async function deletar(id) {                                                        // Funcionalidade DELETAR (exportada indiretamente)
    const cliente = new Client(conexao);
    await cliente.connect();
    const sql = "DELETE FROM biblioteca.emprestimos WHERE id=$1 RETURNING *";
    const values = [id];
    const query = await cliente.query(sql, values);
    await cliente.end();
    let retorno = query.rows[0];
    return retorno;
    }

module.exports = {
      inserir
    , listar,buscarPorId
    , atualizar
    , deletar 
    , validaId
                       // Exporta funcionalidades para NEGOCIO
}