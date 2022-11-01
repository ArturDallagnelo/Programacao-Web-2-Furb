import local_strategy from "passport-local";
import teste from "./UsuarioController.js";
import bcrypt from 'bcrypt';
import passport from "passport";

const LocalStrategy = local_strategy.Strategy

const auth = (passport, res) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'senha',
        session: false
      },
      async (email, senha, done) => {
        try {
          const usuario = await teste.buscaPorEmail(email);
          verificaUsuario(usuario)
          await verificaSenha(senha, usuario.senha);

          done(null, usuario);
        } catch (erro) {
          done(erro);
        }
      }
    ));
}

function verificaUsuario(usuario) {
  if (!usuario) {
    throw new Error("Usuário não existe!");
  }
}

async function verificaSenha(senha, senhaHash) {
  const senhaValida = await bcrypt.compare(senha, senhaHash);
  if (!senhaValida) {
    throw new Error("A senha ou o email informado são inválidos!");
  }
}

export default auth