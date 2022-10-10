import express from "express";
import CursosController from "../controllers/CursosController.js";

const router = express.Router();

router
    .get("/cursos", CursosController.listarCursos)
    .get("/cursos/:id", CursosController.listarCursosPorId)
    .get("/cursos/horas", CursosController.listarCursoPorCargaHoraria) // To Do testar
    .get("/cursos/disciplinas", CursosController.listarCursoPorQuantidadeDeDisciplinas) // To Do testar
    .post("/cursos", CursosController.cadastrarCursos)
    .put("/cursos/:id", CursosController.atualizarCursos)
    .delete("/cursos/:id", CursosController.excluirCursos)

export default router;   