function GroupService(model) {
  this.model = model;
}

GroupService.prototype.createGroup = async function(group) {
  try{
    const data = await this.model.create(group);
    return data.dataValues;
  }catch(error){
    return error
  }
};

GroupService.prototype.getGroup = async function(id) {
  try{
    const data = await this.model.findOne({
      where: { id }
    });
    return data;
  }catch(error){
    return error
  }
};

GroupService.prototype.deleteGroup = async function(id) {
  try{
    const group = await this.model.destroy({ where: { id } });
    return group;
  }catch(error){
    return error
  }
};

GroupService.prototype.updateGroup = async function(id, payload) {
  try {
    const group = await this.model.update(payload, {
      where: { id },
      returning: true,
      plain: true
    });
    return group ? group[1] : null;
  } catch (error) {
    return error;
  }
};

GroupService.prototype.getAllGroups = async function() {
  try{
    const groups = await this.model.findAll();
    return groups;
  }catch(error){
    return error
  }
};

module.exports = GroupService;
