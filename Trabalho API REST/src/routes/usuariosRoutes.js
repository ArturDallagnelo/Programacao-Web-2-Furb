import express from "express";
import UsuarioController from "../controllers/usuarioController.js";

import AutenticacaoController from 'passport'

// Rotas dos Alunos

const router = express.Router();

router.route('usuario/login')
      .post(AutenticacaoController.authenticate('local', {session: false}, UsuarioController.login))
router
  .post("/usuario/", UsuarioController.criarUsuario)

export default router;