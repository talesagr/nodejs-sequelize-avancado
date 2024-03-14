const converteIds = require('../utils/conversorDeStringHelper.js')

class Controller {
  constructor(servicesEntity){
    this.servicesEntity = servicesEntity;
  }

  async getAll(req,res){
    try {
      const listaDeRegistros = await this.servicesEntity.getAllRegisters();
      return res.status(200).json(listaDeRegistros);
    }catch (erro){
      return res.status(500).json({ erro : erro.message})
    }
  }

  async getByID(req,res){
    const { id } = req.params;

    try {
      const registro = await this.servicesEntity.getRegisterByID(id);
      return res.status(200).json(registro);
    }catch (erro){
      return res.status(500).json({ erro : erro.message})
    }
  }

  async getOne(req,res){
    const { ...params } = req.params;
    const where = converteIds(params)
    try {
      const registro = await this.servicesEntity.getRegister(where);
      return res.status(200).json(registro);
    }catch (erro){
      return res.status(500).json({ erro : erro.message})
    }
  }

  async createNew(req,res){
    const data = req.body;
    try{
      const newRegister = await this.servicesEntity.createRegister(data);
      return res.status(200).json(newRegister);
    } catch (erro){
      return res.status(500).json({ erro : erro.message})
    }
  }

  async update(req,res){
    const { ...params } = req.params;
    const updatedData = req.body;

    const where = converteIds(params)
    try {
      const isUpdated = await this.servicesEntity
        .updateRegister(updatedData, where);
      if(!isUpdated){
        return res.status(400).json({mensagem : 'registro não foi atualizado'});
      }
      return res.status(200).json({ mensagem : 'Atualizado com sucesso!'});
    } catch (erro){
      return res.status(500).json({ erro : erro.message})
    }
  }

  async delete(req,res){
    const { id } = req.params;
    try {
      await this.servicesEntity.deleteRegister(Number(id))
      return res.status(200).json({mensagem : `id ${id} deletado com sucesso!`});
    }catch (erro){
      return res.status(500).json({ erro : erro.message})
    }
  }

}

module.exports = Controller;