import Usuario from "../models/Usuario.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import validacoes from "../models/ValidacaoUtils.js"

async function gerarSenhaHash(senha) {
  return await bcrypt.hash(senha, 12)
}

class UsuarioController {

  static criarUsuario = async (req, res) => {
    let usuario = new Usuario(req.body)

    try {
      this.validarUsuario(usuario)
      usuario.senha = await gerarSenhaHash(usuario.senha)

      usuario.save(() => {
        res.status(201).send(usuario.toJSON())
      })

    } catch (erro) {
      res.status(409).json({ erro: erro.message });
    }
  }

  static login = (req, res) => {
    const token = this.getToken(req.user);
    res.set('Authorization', token);

    res.status(204).send();
  }

  static async buscaPorEmail(email) {
    const usuario = await Usuario.findOne({ email: email });
    if (!usuario) {
      return null;
    }
    return usuario;
  }

  static async buscaPorId(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const usuario = await Usuario.findById({ id });
      if (!usuario) {
        return null;
      }
      return usuario;
    }
    return null;
  }

  static getToken(usuario) {
    const payload = {
      id: usuario.id
    };

    //gerar o token a partir do payload
    const token = jwt.sign(payload, process.env.CHAVE_JWT, {expiresIn: '15m'});
    return token;
  }

  static validarUsuario(usuario) {

    if (this.buscaPorEmail(usuario.email)) {
      throw new Error("Já existe um usuário com este email!")
    }

    validacoes.verificaNulo(usuario.nome);
    validacoes.verificaNulo(usuario.email);
    validacoes.verificaTamanhoMin(usuario.senha, 'senha', 5);
    validacoes.verificaTamanhoMax(usuario.senha, 'senha', 15);
  }

  static getAllUsuarios = (req, res) => {
    Usuario.find()
      .exec((err, Usuario) => {
        res.status(200).json(Usuario)
      })
  }

}

export default UsuarioController