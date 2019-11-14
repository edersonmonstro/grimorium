const express = require('express');

const Usuario = require('../models/Usuario');

const rotas = express.Router();

rotas.post('/registrar', async (req, res) => {
    console.log('grimorium >> POST : aut/registrar.');
    
    const { email } = req.body;
    try {

        if( await Usuario.findOne({email}) )
            return res.status(400).send({erro : 'grimorium >> ERRO : usuário já cadastrado'});

        const usuario = await Usuario.create(req.body);

        usuario.senha = undefined;

        return res.send({usuario});
    } catch (erro) {
        return res.status(400).send({erro : 'grimorium >> ERRO : Falha no registro'});
    }
})

module.exports = (app) => app.use('/aut', rotas);