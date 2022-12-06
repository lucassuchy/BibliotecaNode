const express = require('express');                 // Importa o framework EXPRESS do NODE.JS 
const rota = express.Router();                      // Vincula o framework EXPRESS com uma variavel local

const livroController = require('../controller/livro_controller');      // Importa funcionalides de CONTROLLER

rota.post('/', livroController.inserir);            // Funcionalidade INSERIR
rota.get('/', livroController.listar);              // Funcionalidade LISTAR
rota.get('/:id', livroController.buscarPorId);      // Funcionalidade BUSCAR_POR_ID
rota.put('/:id', livroController.atualizar);        // Funcionalidade ATUALIZAR
rota.delete('/:id', livroController.deletar);       // Funcionalidade DELETAR

module.exports = rota;                              // Exporta funcionalidade para APP