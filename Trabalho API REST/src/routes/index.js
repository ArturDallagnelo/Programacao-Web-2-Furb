import express from "express";
import alunos from "./alunosRoutes.js"
import cursos from "./cursosRoutes.js"
import usuarios from "./usuariosRoutes.js"
import teste2 from "../controllers/autenticacaoController.js"

// Index do Servidor

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({titulo: "Trabalho API REST Programação Web II"})
  })

  app.use(
    express.json(),
    alunos,
    cursos,
    usuarios,
    teste2
  )
}


export default routes