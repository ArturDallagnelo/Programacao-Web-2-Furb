import Usuario from "../models/Usuario.js";
import bcrypt from 'bcrypt';

async function gerarSenhaHash(senha) {
  return await bcrypt.hash(senha, 12)
}

class UsuarioController {

  static criarUsuario = async (req, res) => {
    let usuario = new Usuario(req.body)

    usuario.senha = await gerarSenhaHash("3000")
    usuario.save((err) => {

      if (err) {
        res.status(500).send({ message: `${err.message} - Falha ao cadastrar Usuário.` })
      } else {
        res.status(201).send(usuario.toJSON())
      }
    })
  }

  static login = (req, res) => {
    res.status(204).send();
  }

  static async buscaPorEmail(email) {
    const usuario = await Usuario.findOne({ email: email });
    if (!usuario) {
      return null;
    }
    return new Usuario(usuario);
  }


}

export default UsuarioController