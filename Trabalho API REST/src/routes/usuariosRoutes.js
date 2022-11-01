import express from "express";
import UsuarioController from "../controllers/usuarioController.js";
import passport from "passport";

const router = express.Router();

router
  .post("/usuario/", UsuarioController.criarUsuario)
  .post('/usuario/login', passport.authenticate('local', { session: false }), UsuarioController.login)

export default router;