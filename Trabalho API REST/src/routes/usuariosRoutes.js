import express from "express";
import UsuarioController from "../controllers/usuarioController.js";

const AutenticacaoController = require('passport')

// Rotas dos Alunos

const router = express.Router();

router
  .post("/usuario/", UsuarioController.criarUsuario)
  .post(AutenticacaoController.authenticate('local', {session: false}), UsuarioController.login)
export default router;