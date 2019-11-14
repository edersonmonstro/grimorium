const jwt = require('jsonwebtoken');
const autConfig = require('../config/aut.json');


module.exports = (req, res, next) => {
    const autHeader = req.headers.authorization;

    if (!autHeader) return res.status(400).send({erro : 'grimorium >> ERRO : o token não foi informado'});

    const partes = autHeader.split(' ');

    if (!partes.lenght === 2) return res.status(401).send({erro : 'grimorium >> ERRO : erro no token'});

    const[scheme, token] = partes;

    if (!/^Bearer$/i.test(scheme)) return res.status(401).send({erro : 'grimorium >> ERRO : token mal formado'});

    jwt.verify(token, autConfig.segredo, (err, decoded) => {
        if (err) return res.status(401).send({erro : 'grimorium >> ERRO : token inválido'});

        req.userId = decoded.id; // id que foi criada ao gerar token pro usuario no autController/autenticar
        console.log('request usr id', req.userId);
        console.log('decoded id', decoded.id);

        return next();
    });
};