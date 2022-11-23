import mongoose from "mongoose";

const alunoSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {type: String, required: true},
    cursos: [{type: mongoose.Schema.Types.ObjectId, ref: 'cursos'}],
    semestre: {type: Number},
  }
);

const aluno = mongoose.model('alunos', alunoSchema);

export default aluno;