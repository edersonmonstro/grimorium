const express = require('express');
const autMiddleware = require('../middleware/aut');

const rotas = express.Router();

rotas.use(autMiddleware);

rotas.get('/', (req, res) => {
    res.send({ok : true, user: req.userId});
})

module.exports = app => app.use('/projeto', rotas);