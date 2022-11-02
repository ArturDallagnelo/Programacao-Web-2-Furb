import express from "express";
import alunos from "./alunosRoutes.js"
import cursos from "./cursosRoutes.js"
import usuarios from "./usuariosRoutes.js"
import auth from "../controllers/AutenticacaoController.js"
import passport from "passport";
import authToken from "../controllers/AutenticacaoTokenController.js";
import MiddlewareAutenticacao from "../models/MiddlewareAutenticacao.js"

auth(passport)
authToken(passport)

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({ titulo: "Trabalho API REST Programação Web II" })
  })

  app.use(
    express.json(),
    alunos,
    cursos,
    usuarios,
    auth,
    authToken
  )
}

export default routes