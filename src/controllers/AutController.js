const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const autConfig = require('../config/aut.json');

const Usuario = require('../models/Usuario');

const rotas = express.Router();

function gerarToken(params = {}) {
    return jwt.sign({params}, autConfig.segredo, { 
        expiresIn: 86400 
    });
}

rotas.post('/registrar', async (req, res) => {
    console.log('grimorium >> POST : aut/registrar.');
    
    const { email } = req.body;
    try {

        if( await Usuario.findOne({email}) )
            return res.status(400).send({erro : 'grimorium >> ERRO : usuário já cadastrado'});

        const usuario = await Usuario.create(req.body);

        usuario.senha = undefined;

        // já passa um token junto para o usuario ir direto pra uso da app
        return res.send({usuario, token : gerarToken({ id: usuario.id })});
    } catch (erro) {
        return res.status(400).send({erro : 'grimorium >> ERRO : Falha no registro'});
    }
})

rotas.post('/autenticar', async (req, res) => {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({email}).select('+senha');

    // se email informado não existe
    if (!usuario) return res.status(400).send({erro : 'grimorium >> ERRO : Usuário não encontrado'});

    // se senhas não batem
    if (!await bcrypt.compare(senha, usuario.senha)) return res.status(400).send({erro : 'grimorium >> ERRO : senha incorreta'});

    // se logou normalmente
    // omite senha
    usuario.senha = undefined;

    // gerar um token e exibe junto com info de usuario    
    res.send({usuario, token : gerarToken({ id: usuario.id })});

});

module.exports = (app) => app.use('/aut', rotas);