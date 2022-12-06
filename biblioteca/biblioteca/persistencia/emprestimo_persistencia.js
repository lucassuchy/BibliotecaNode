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

function inserir(emprestimo, callback) {                                                   // Funcionalidade INSERIR (exportada indiretamente)
    const cliente = new Client(conexao);
    cliente.connect();
	// data devolução: hoje + 1 uma semana, podemos adicionar uma variavel pra tratar isso
    const data = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    const devolucao = new Date(Date.now() + (( 3600 * 1000 * 24) * 7)).toISOString().replace(/T/, ' ').replace(/\..+/, '')
    const sql = "INSERT INTO biblioteca.emprestimos (data_emprestimo, data_devolucao, id_livro, id_cliente) VALUES($1,$2, $3, $4) RETURNING *"
    const values = [data,devolucao,emprestimo.livro, emprestimo.usuario];

    cliente.query(		
		sql, values, 
        function (err, res){
            if(err){
                console.log(err);
                callback(erroBD, undefined);
            }
            else {
                callback(undefined, res.rows[0]);
            }
            cliente.end();
        }
	)
		
}

function listar(callback) {                                                             // Funcionalidade LISTAR (exportada indiretamente)
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "select a.id, b.nome as livro, c.nome as usuario, a.data_emprestimo, a.data_devolucao from crud_produtos.biblioteca.emprestimos a inner join crud_produtos.biblioteca.livros b on a.id_livro  = b.id  inner join crud_produtos.biblioteca.usuarios c on a.id_cliente  = c.id order by id";
    cliente.query(sql, 
        function (err, res) {
            if(err) {
                console.log(err);
                callback(erroBD, undefined);
            }
            else {
                let emprestimos = res.rows;
                // console.log(res.rows)
                callback(undefined, emprestimos);     
            }
            cliente.end();
        }
    )    
}

function buscarPorId(id, callback){                                                    // Funcionalidade BUSCAR_POR_ID (exportada indiretamente)
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "SELECT * FROM biblioteca.emprestimos WHERE id=$1";
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
                callback(erroEmprestimoNaoEncontrado, undefined);
            }

            cliente.end();
        }
    )    
}

function atualizar(id, emprestimo, callback) {                                              // Funcionalidade ATUALIZAR (exportada indiretamente)
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "UPDATE biblioteca.emprestimos SET id_livro=$1, id_cliente=$2, data_emprestimo=$3, data_devolucao=$4 WHERE id=$5 RETURNING *"    
    const values = [emprestimo.livro, emprestimo.usuario, emprestimo.data_emprestimo, emprestimo.data_devolucao, id];

    cliente.query(sql, values, function(err, res) {
        if(err) {
            console.log(err);
            callback(erroBD, undefined);                
        }
        else if (res.rows && res.rows.length > 0) {
            let emprestimo = res.rows[0];
            callback(undefined, emprestimo);
        }
        else {
            callback(erroEmprestimoNaoEncontrado, undefined);
        }

        cliente.end();        
    })
}


function deletar(id, callback) {                                                        // Funcionalidade DELETAR (exportada indiretamente)
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "DELETE FROM biblioteca.emprestimos WHERE id=$1 RETURNING *"
    const values = [id];

    cliente.query(sql, values, function(err, res) {
        if(err) {
            console.log(err);
            callback(erroBD, undefined);                
    }
        else if (res.rows && res.rows.length > 0) {
            let emprestimo = res.rows[0];
            callback(undefined, emprestimo);
        }
        else {
            callback(erroemprestimoNaoEncontrado, undefined);
    }

        cliente.end();        
    })
}


function qtdLivros(id, callback) {                                                   // Funcionalidade INSERIR (exportada indiretamente)
    const cliente = new Client(conexao);
    cliente.connect();
	// data devolução: hoje + 1 uma semana, podemos adicionar uma variavel pra tratar isso
    const sql = "select count(*) from crud_produtos.biblioteca.emprestimos where id_cliente = $1"
    const values = [id];

    cliente.query(		
		sql, values, 
        function (err, res){
            if(err){
                console.log(err);
                callback(erroBD, undefined);
            }
            else {
                callback(undefined, (parseInt(res.rows[0].count)));
            }
            cliente.end();
        }
	)
		
}


function verificaLivroExiste(id, callback){                                                    // Funcionalidade BUSCAR_POR_ID (exportada indiretamente)
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "SELECT id FROM biblioteca.emprestimos WHERE id=$1";
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
                callback(erroEmprestimoNaoEncontrado, undefined);
            }

            cliente.end();
        }
    )    
}

function verificaLivroDisponivel(id, callback){                                                    // Funcionalidade BUSCAR_POR_ID (exportada indiretamente)
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "select count(id_livro) from crud_produtos.biblioteca.emprestimos where id_livro = $1 group by id_livro";
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
                callback(erroEmprestimoNaoEncontrado, undefined);
            }

            cliente.end();
        }
    )    
}


module.exports = {
    inserir, listar,buscarPorId,atualizar, deletar,qtdLivros ,verificaLivroDisponivel                   // Exporta funcionalidades para NEGOCIO
}