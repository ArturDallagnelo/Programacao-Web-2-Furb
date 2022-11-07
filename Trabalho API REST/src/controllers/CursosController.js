import cursos from "../models/Curso.js";

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



  static listarCursos = (req, res) => {
    cursos.find((err, cursos) => {
      if(!err) {
        res.status(200).json(cursos)
      } else {
        res.status(401).send({message: `${err.message} - Usuário não autenticado`})
      }
    })
  }

  static listarCursosPorId = (req, res) => {
    const id = req.params.id;

    cursos.findById(id, (err, cursos) => {
      if(err) {
        res.status(400).send({message: `${err.message} - Id do Curso não localizado.`})
      } else {
        res.status(200).send(cursos);
      }
    })
  }

  static cadastrarCursos = (req, res) => {
    let curso = new cursos(req.body);

    curso.save((err) => {

      if(err) {
        res.status(500).send({message: `${err.message} - Falha ao cadastrar Curso.`})
      } else {
        res.status(201).send(curso.toJSON())
      }
    })
  }

  static atualizarCursos = (req, res) => {
    const id = req.params.id;

    cursos.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err) {
        res.status(200).send({message: 'Curso atualizado com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static excluirCursos = (req, res) => {
    const id = req.params.id;

    cursos.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: 'Curso removido com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static listarCursoPorCargaHoraria = (req, res) => {
    const horas = req.params.horas

    cursos.find({'cargaHoraria': horas}, {}, (err, curso) => {
      res.status(200).send(curso);

    })
  }

  static listarCursoPorQuantidadeDeDisciplinas = (req, res) => {
    const qtdDisciplinas = req.params.qtdDisciplinas

    cursos.find({'qtdDisciplinas': qtdDisciplinas}, {}, (err, curso) => {
      res.status(200).send(curso);

    })
  }
}

export default CursosController