const mongoose = require('../database/connector');
mongoose.set('useCreateIndex', true);

const UsuarioSchema = new mongoose.Schema({
    nome : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        index : true,
        lowercase : true
    },
    senha : {
        type : String,
        required : true,
        select : false,
    },
    criadoEm : {
        type : Date,
        default : Date.now
    }

});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;