const express = require('express');                   // Importa o framework EXPRESS do NODE.JS 
const app = express();                                // Vincula o framework EXPRESS com uma variavel local        

const port = 3000;

app.use(express.json());                            
app.use(express.urlencoded({ extended: true }));

const livrosRota = require('./rotas/livro_rota');     // Importa funcionalides de ROTAS
app.use('/api/livros', livrosRota);                   // Conecta com ROTAS

const usuarioRota = require('./rotas/usuario_rota');  // Importa funcionalides de ROTAS
app.use('/api/usuarios', usuarioRota);                // Conecta com ROTAS

const emprestimoRota = require('./rotas/emprestimo_rotas');  // Importa funcionalides de ROTAS
app.use('/api/emprestimos', emprestimoRota);                // Conecta com ROTAS


app.listen(port, () => {
  console.log(`Servido app escutando na porta ${port}`)
});