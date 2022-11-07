import express from "express";
import CursosController from "../controllers/CursosController.js";
import MiddlewareAutenticacao from "../models/MiddlewareAutenticacao.js"

const router = express.Router();

router
    .get("/cursos", CursosController.listarCursos)
    .get("/cursos/horas/:horas", CursosController.listarCursoPorCargaHoraria)
    .get("/cursos/disciplinas", CursosController.listarCursoPorQuantidadeDeDisciplinas)
    .get("/cursos/:id", CursosController.listarCursosPorId)
    .post("/cursos", MiddlewareAutenticacao.bearer, CursosController.cadastrarCursos)
    .put("/cursos/:id", MiddlewareAutenticacao.bearer, CursosController.atualizarCursos)
    .delete("/cursos/:id", CursosController.excluirCursos)

export default router;   