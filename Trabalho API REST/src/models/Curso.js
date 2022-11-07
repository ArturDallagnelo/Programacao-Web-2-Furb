import mongoose from "mongoose";

const cursoSchema = new mongoose.Schema(
  {
    id: {type: String},
    nomeCurso: {type: String, required: true},
    qtdDisciplinas: {type: Number, required: true},
    cargaHoraria: {type: Number, required: true},
    alunos: [{type: mongoose.Schema.Types.ObjectId, ref: 'aluno'}]
  },
  {
    versionKey: false
  }
)

const curso = mongoose.model("cursos", cursoSchema)

export default curso;