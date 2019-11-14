const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// passando controller com suas rotas para o express
require('./controllers/autController')(app);
require('./controllers/projetoController')(app);

// exemplo de rota em express
//app.get('/', (req, res) => {
//    res.send('OK');
//});

app.listen(3000);
console.log('grimorium >> running at port 3000.');
