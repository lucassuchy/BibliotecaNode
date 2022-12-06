const express = require('express');                 // Importa o framework EXPRESS do NODE.JS 
const rota = express.Router();                      // Vincula o framework EXPRESS com uma variavel local

const usuarioController = require('../controller/usuario_controller');      // Importa funcionalides de CONTROLLER

rota.post('/', usuarioController.inserir);            // Funcionalidade INSERIR
rota.get('/', usuarioController.listar);              // Funcionalidade LISTAR
rota.get('/:id', usuarioController.buscarPorId);      // Funcionalidade BUSCAR_POR_ID
rota.put('/:id', usuarioController.atualizar);        // Funcionalidade ATUALIZAR
rota.delete('/:id', usuarioController.deletar);       // Funcionalidade DELETAR

module.exports = rota;                              // Exporta funcionalidade para APP