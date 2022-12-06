const express = require('express');                 // Importa o framework EXPRESS do NODE.JS 
const rota = express.Router();                      // Vincula o framework EXPRESS com uma variavel local

const emprestimoController = require('../controller/emprestimo_controller.js');      // Importa funcionalides de CONTROLLER

rota.post('/', emprestimoController.inserir);            // Funcionalidade INSERIR
rota.get('/', emprestimoController.listar);              // Funcionalidade LISTAR
rota.get('/:id', emprestimoController.buscarPorId);      // Funcionalidade BUSCAR_POR_ID
rota.put('/:id', emprestimoController.atualizar);        // Funcionalidade ATUALIZAR
rota.delete('/:id', emprestimoController.deletar);       // Funcionalidade DELETAR

module.exports = rota;                              // Exporta funcionalidade para APP