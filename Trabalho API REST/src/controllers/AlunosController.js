import Aluno from "../models/Aluno.js";
import Curso from "../models/Curso.js";

class AlunosController {

  static listarAlunos = async (req, res) => {
    try {
      const alunos = await Aluno.find().populate('cursos');
      return res.send({ alunos });

    } catch (err) {
      return res.status(400).send({ error: "Erro ao listar alunos" });
    }
  }

  static listarAlunosPorId = async (req, res) => {
    try {
      const alunos = await Aluno.findById(req.params.id).populate('cursos');
      return res.send({ alunos });

    } catch (err) {
      return res.status(400).send({ error: "Erro ao listar o aluno" })
    }
  }

  static cadastrarAlunos = async (req, res) => {
    try {
      const { nome, semestre, cursos } = req.body;

      const alunos = await Aluno.create({ nome, semestre });

      await Promise.all(cursos.map(async curso => {
        const alunoCurso = new Curso({ ...curso, alunos: alunos._id});

        await alunoCurso.save();

        alunos.cursos.push(alunoCurso);
      }));

      await alunos.save();

      return res.send({ alunos });
    } catch (err) {
      return res.status(400).send({ error: "Erro ao cadastrar aluno" })
    }
  }

  static atualizarAlunos = async (req, res) => {
    try {
      const { nome, semestre, cursos } = req.body;
      const alunos = await Aluno.findByIdAndUpdate(req.params.id, { nome, semestre }, { new: true });

      alunos.cursos = [];
      await Curso.remove({ alunos: alunos._id });

      await Promise.all(cursos.map(async curso => {
        const alunoCurso = new Curso({ ...curso, alunos: alunos._id});

        await alunoCurso.save();

        alunos.cursos.push(alunoCurso);
      }));

      await alunos.save();
      return res.send({ alunos });

    } catch (err) {
      return res.status(400).send({ error: "Erro ao atualizar aluno" })
    }
  }

  static excluirAlunos = async (req, res) => {
    try {
      const alunos = await Aluno.findByIdAndDelete(req.params.id).populate('cursos');
      return res.send({ alunos });

    } catch (err) {
      return res.status(400).send({ error: "Erro ao excluir aluno" });
    }
  }

  static listarAlunosPorSemestre = async (req, res) => {
    try {
      const alunos = await Aluno.find({ 'semestre': req.params.semestre }).populate('cursos');

      return res.send({ alunos });
    } catch (err) {
      return res.status(400).send({ error: "Erro ao listar o aluno" })
    }
  }

  static listarAlunoPorNome = async (req, res) => {
    try {
      const alunos = await Aluno.find({ 'nome': {$regex: `${req.params.nome}`}}).populate('cursos');

      return res.send({ alunos });
    } catch (err) {
      return res.status(400).send({ error: "Erro ao listar o aluno" })
    }
  }

}

export default AlunosController