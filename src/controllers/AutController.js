const express = require('express');
const bcrypt = require('bcryptjs');

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

rotas.post('/autenticar', async (req, res) => {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({email}).select('+senha');

    if (!usuario) return res.status(400).send({erro : 'grimorium >> ERRO : Usuário não encontrado'});

    // se senhas não batem
    if (!await bcrypt.compare(senha, usuario.senha)) return res.status(400).send({erro : 'grimorium >> ERRO : senha incorreta'});

    // se logou normalmente
    res.send({usuario});

});

module.exports = (app) => app.use('/aut', rotas);