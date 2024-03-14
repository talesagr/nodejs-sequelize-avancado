const Controller = require('./Controller.js')
const PessoaServices = require('../services/PessoaServices.js')

const pessoaServices = new PessoaServices();

class PessoaController extends Controller{
  constructor() {
    super(pessoaServices);
  }

  async getMatriculasAtivas(req,res){
    const {estudante_id} = req.params
    try {
      const listaMatriculas = await pessoaServices.pegaMatriculasAtivasPorEstudantes
      (Number(estudante_id));
      return res.status(200).json(listaMatriculas)
    } catch (erro){
      return res.status(500).json({ erro : erro.message})
    }
  }

  async getAllMatriculas(req,res){
    const {estudante_id} = req.params
    try {
      const listaMatriculas = await pessoaServices.pegaTodasMatriculasPorEstudantes
      (Number(estudante_id));
      return res.status(200).json(listaMatriculas)
    } catch (erro){
      return res.status(500).json({ erro : erro.message})
    }
  }

  async pegaTodasAsPessoas(req,res){
    try {
      const listaPessoa = await pessoaServices.pegaPessoaEscopoTodos();
      return res.status(200).json(listaPessoa)
    } catch (erro){
      return res.status(500).json({ erro : erro.message})
    }

  }

  async cancelaRegistroEstudante(req,res){
    const { estudante_id} = req.params;
    try {
      await pessoaServices.cancelaPessoaEMatriculas(Number(estudante_id));
      return res.status(200).json({mensagem : `matriculas ref. estudante ${estudante_id} canceladas!`})
    } catch (erro){
      return res.status(500).json({ erro : erro.message})
    }
  }

}

module.exports = PessoaController;