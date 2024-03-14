const datasource = require('../database/models')

class Services {
  constructor(modelName) {
    this.model = modelName;
  }

  async getAllRegisters(where = {}){
    return datasource[this.model].findAll({ where : { ...where }});
  }

  async getRegisterByScope (scope){
    return datasource[this.model].scope(scope).findAll();
  }

  async getRegisterByID(id){
    return datasource[this.model].findByPk(id);
  }

  async getRegister(where){
    return datasource[this.model].findOne({where : { ...where} });
  }

  async getEContaRegistros(options){
    return datasource[this.model].findAndCountAll({...options})
  }

  async createRegister(registerData){
    return datasource[this.model].create(registerData);
  }

  async updateRegister(updatedData,where, transaction = {}){
    const listUpdatedRegister = datasource[this.model]
      .update(updatedData, {
      where : {...where},
      transaction : transaction
    });

    if(listUpdatedRegister[0] === 0){
      return false;
    }
    return true;
  }

  async deleteRegister(id){
    return datasource[this.model].destroy({where : {id : id}})
  }
}

module.exports = Services;