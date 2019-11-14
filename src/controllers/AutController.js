const express = require('express');

const Usuario = require('../models/Usuario');

const rotas = express.Router();

rotas.post('/registrar', async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);

        return res.send({usuario});
    } catch (erro) {
        return res.status(400).send({erro : 'grimorium >> ERRO : Falha no registro'});
    }
})

module.exports = (app) => app.use('/aut', rotas);