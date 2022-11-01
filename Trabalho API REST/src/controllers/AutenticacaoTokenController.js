import jwt from 'jsonwebtoken'
import token_strategy from 'passport-http-bearer'
import UsuarioController from "./UsuarioController.js";

const BearerStrategy = token_strategy.Strategy

const authToken = (passport) => {
  passport.use(
    new BearerStrategy(
      (token, done) => {
        try {
          const payload = jwt.verify(token, process.env.CHAVE_JWT);
          const usuario = UsuarioController.buscaPorId(payload.id);
          done(null, usuario);
        } catch (erro) {
          done(erro);
        }
      }
    )
  )
}

export default authToken
