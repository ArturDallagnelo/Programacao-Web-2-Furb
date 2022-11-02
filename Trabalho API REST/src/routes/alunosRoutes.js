import express from "express";
import AlunosController from "../controllers/AlunosController.js";
import passport from 'passport'
import MiddlewareAutenticacao from "../models/MiddlewareAutenticacao.js"

const router = express.Router();

router
    .get("/alunos", AlunosController.listarAlunos)
    .get("/alunos/busca", AlunosController.listarAlunosPorCurso)
    .get("/alunos/semestre", AlunosController.listarAlunosPorSemestre)
    .get("/alunos/nome/:nome", AlunosController.listarAlunoPorNome)
    .get("/alunos/:id", AlunosController.listarAlunosPorId)
    .post("/alunos", MiddlewareAutenticacao.bearer, AlunosController.cadastrarAlunos)
    .put("/alunos/:id", MiddlewareAutenticacao.bearer, AlunosController.atualizarAlunos)
    .delete("/alunos/:id", AlunosController.excluirAlunos)

export default router;