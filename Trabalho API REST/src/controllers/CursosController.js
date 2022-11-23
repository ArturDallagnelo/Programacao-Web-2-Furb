import Curso from "../models/Curso.js";
import Aluno from "../models/Aluno.js";

class CursosController {

  // static status(){
  //   res.status(401).send({message: `${err.message} - Usuário não autenticado`})
  //   res.status(400).send({message: `${err.message} - Id do Curso não localizado.`})
  //   res.status(403).send({message: `${err.message} - Sem permissão`})
  //   res.status(404).send({message: `${err.message} - URL Inválida`})
  //   res.status(405).send({message: `${err.message} - Método GET não disponível`})
  //   res.status(429).send({message: `${err.message} - Excesso de requisições, Aguarte 15 segundos`})
  //   res.status(408).send({message: `${err.message} - Time-out`})
  // }

  static listarCursos = async (req, res) => {
    try {
      const cursos = await Curso.find().populate('alunos');
      return res.send({ cursos })

    } catch (err) {
      return res.status(400).send({ error: "Erro ao listar cursos" });
    }
  }

  static listarCursosPorId = async (req, res) => {
    try {
      const cursos = await Curso.findById(req.params.id).populate('alunos');
      return res.send({ cursos });

    } catch (err) {
      return res.status(400).send({ error: "Erro ao listar o curso"});
    }
  }

  static cadastrarCursos = async (req, res) => {
    try {
      const { nomeCurso, qtdDisciplinas, cargaHoraria, alunos } = req.body;

      const cursos = await Curso.create({ nomeCurso, qtdDisciplinas, cargaHoraria });

      await Promise.all(alunos.map(async aluno => {
        const cursoAluno = new Aluno({ ...aluno, cursos: cursos._id });

        await cursoAluno.save();

        cursos.alunos.push(cursoAluno);
      }));

      await cursos.save();

      return res.send({ cursos });
    } catch (err) {
      return res.status(400).send({ error: "Erro ao cadastrar curso" })
    }
  }

  static atualizarCursos = async (req, res) => {
    try {
      const { nomeCurso, qtdDisciplinas, cargaHoraria, alunos } = req.body;
      const cursos = await Curso.findByIdAndUpdate(req.params.id, { nomeCurso, qtdDisciplinas, cargaHoraria }, { new: true });

      cursos.alunos = [];
      await Aluno.remove({ alunos: alunos._id });

      await Promise.all(alunos.map(async aluno => {
        const cursoAluno = new Aluno({ ...aluno, cursos: cursos._id });

        await cursoAluno.save();

        cursos.alunos.push(cursoAluno);
      }));

      await cursos.save();
      return res.send({ cursos });
    } catch (err) {
      return res.status(400).send({ error: "Erro ao atualizar curso" })
    }
  }

  static excluirCursos = async (req, res) => {
    try {
      const cursos = await Curso.findByIdAndDelete(req.params.id).populate('alunos');
      return res.send({ cursos });

    } catch (err) {
      return res.status(400).send({ error: "Erro ao excluir curso" });
    }
  }

  static listarCursoPorCargaHoraria = async (req, res) => {
    try {
      const cursos = await Curso.find({ 'cargaHoraria': req.params.horas }).populate('alunos');
      return res.send({ cursos });

    } catch (err) {
      return res.status(400).send({ error: "Erro ao listar o curso" });
    }
  }

  static listarCursoPorQuantidadeDeDisciplinas = async (req, res) => {
    try {
      const cursos = await Curso.find({ 'qtdDisciplinas': req.params.qtdDisciplinas }).populate('alunos')
      return res.send({ cursos });

    } catch (err) {
      return res.status(400).send({ error: "Erro ao listar o curso" });
    }
  }
}

export default CursosController