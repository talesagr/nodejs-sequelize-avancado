const dataSource = require('../database/models')
const Services = require('./Services.js')

class PessoaServices extends Services {
  constructor() {
    super('Pessoa');
    this.matriculaServices = new Services('Matricula')
  }

  async pegaMatriculasAtivasPorEstudantes(id){
    const estudante = await super.getRegisterByID(id);
    return await estudante.getAulasMatriculadas();
  }

  async pegaTodasMatriculasPorEstudantes(id){
    const estudante = await super.getRegisterByID(id);
    return await estudante.getTodasAsMatriculas();
  }

  async pegaPessoaEscopoTodos(){
    return await super.getRegisterByScope('todosOsRegistros');
  }

  async cancelaPessoaEMatriculas(estudanteId){
    return dataSource.sequelize.transaction(async (transaction)=>{
      await super.updateRegister({ ativo : false }, { id:estudanteId }, transaction);
      await this.matriculaServices.updateRegister({status : 'cancelado'}, {estudante_id : estudanteId}, transaction)
    });
  }
}

module.exports = PessoaServices;