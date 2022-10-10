import express from "express";
import AlunosController from "../controllers/AlunosController.js";

const router = express.Router();

router
    .get("/alunos", AlunosController.listarAlunos)
    .get("/alunos/busca", AlunosController.listarAlunosPorCurso)
    .get("/alunos/:id", AlunosController.listarAlunosPorId)
    .get("/alunos/semestre", AlunosController.listarAlunosPorSemestre)  // To Do testar
    .post("/alunos", AlunosController.cadastrarAlunos)
    .put("/alunos/:id", AlunosController.atualizarAlunos)
    .delete("/alunos/:id", AlunosController.excluirAlunos)

export default router;