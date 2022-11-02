import express from "express";
import UsuarioController from "../controllers/usuarioController.js";
import MiddlewareAuth from "../models/MiddlewareAutenticacao.js"

const router = express.Router();

router
  .get('/usuario/', UsuarioController.getAllUsuarios)
  .post('/usuario/', UsuarioController.criarUsuario)
  .post('/usuario/login', MiddlewareAuth.local, UsuarioController.login)

export default router;