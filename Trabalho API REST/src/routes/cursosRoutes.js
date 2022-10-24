import express from "express";
import CursosController from "../controllers/CursosController.js";

const router = express.Router();

router
    .get("/cursos", CursosController.listarCursos)
    .get("/cursos/horas", CursosController.listarCursoPorCargaHoraria)
    .get("/cursos/disciplinas", CursosController.listarCursoPorQuantidadeDeDisciplinas)
    .get("/cursos/:id", CursosController.listarCursosPorId)
    .post("/cursos", CursosController.cadastrarCursos)
    .put("/cursos/:id", CursosController.atualizarCursos)
    .delete("/cursos/:id", CursosController.excluirCursos)

export default router;   