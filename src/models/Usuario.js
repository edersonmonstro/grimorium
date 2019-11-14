const mongoose = require('../database/connector');
mongoose.set('useCreateIndex', true);
const bcrypt = require('bcryptjs');

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

// gear hash antes de salvar e colocar na senha
UsuarioSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;
    next();
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;