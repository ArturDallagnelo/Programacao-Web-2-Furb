import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";
import teste from "../controllers/UsuarioController.js";

import bcrypt from'bcrypt';

export default () => {
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
          verificaUsuario(usuario);
          await verificaSenha(senha, usuario.senhaHash);
  
          done(null, usuario);
        } catch (erro) {
          done(erro);
        }
      }
    )
  );
}

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


