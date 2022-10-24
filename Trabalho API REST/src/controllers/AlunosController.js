import alunos from "../models/Aluno.js";

class AlunosController {

  static listarAlunos = (req, res) => {
    alunos.find()
      .populate('curso')
      .exec((err, alunos) => {
        res.status(200).json(alunos)
  })
  }

  static listarAlunosPorId = (req, res) => {
    const id = req.params.id;

    alunos.findById(id)
      .populate('curso', 'nome')
      .exec((err, alunos) => {
      if(err) {
        res.status(400).send({message: `${err.message} - Id do Aluno não localizado.`})
      } else {
        res.status(200).send(alunos);
      }
    })
  }

  static cadastrarAlunos = (req, res) => {
    let aluno = new alunos(req.body);

    aluno.save((err) => {

      if(err) {
        res.status(500).send({message: `${err.message} - Falha ao cadastrar Aluno.`})
      } else {
        res.status(201).send(aluno.toJSON())
      }
    })
  }

  static atualizarAlunos = (req, res) => {
    const id = req.params.id;

    alunos.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err) {
        res.status(200).send({message: 'Aluno atualizado com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static excluirAlunos = (req, res) => {
    const id = req.params.id;

    alunos.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: 'Aluno removido com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static listarAlunosPorCurso = (req, res) => {
    const curso = req.query.curso

    alunos.find({'curso': curso}, {}, (err, alunos) => {
      res.status(200).send(alunos);

    })
  }

  static listarAlunosPorSemestre = (req, res) => {
    const semestre = req.query.semestre

    alunos.find({'semestre': semestre}, {}, (err, alunos) => {
      res.status(200).send(alunos);

    })
  }
}

export default AlunosController