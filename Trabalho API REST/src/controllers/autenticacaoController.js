const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UsuarioController = require('./UsuarioController');
const bcrypt = require('bcrypt');
const { default: Usuario } = require('../models/Usuario');

function verificaUsuario(usuario) {
  if (!usuario) {
    throw new Error();
  }
}

async function verificaSenha(senha, senhaHash) {
  const senhaValida = await bcrypt.compare(senha, senhaHash);
  if (!senhaValida) {
    throw new Error();
  }
}

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'senha',
      session: false
    },
    async (email, senha, done) => {
      try {
        const usuario = await UsuarioController.buscaPorEmail(email);
        verificaUsuario(usuario);
        await verificaSenha(senha, usuario.senhaHash);

        done(null, usuario);
      } catch (erro) {
        done(erro);
      }
    }
  )
);