const Sequelize = require("sequelize");

function GroupService(userModel, groupModel) {
  this.userModel = userModel;
  this.groupModel = groupModel;
}

GroupService.prototype.addUsersToGroup = async function(groupUsers) {
  try{
    const data = await this.groupModel.findOne({ where: { id: groupUsers.group } });
    const inP = Sequelize.Op.in;
  
    const users = await this.userModel.findAll({
      where: { id: { [inP]: groupUsers.users } }
    });
  
    await data.addUsers(users);
  
    const usersGroups = await this.groupModel.findOne({
      where: { id: groupUsers.group },
      include: [
        {
          model: this.userModel,
          as: "users",
          attributes: ["login", "password", "id", "age"]
        }
      ]
    });
    return usersGroups;
  } catch(error){
    return error
  }
};

GroupService.prototype.getGroup = async function(id) {
  try{
    const data = await this.model.findOne({
      where: { id }
    });
    return data;
  }catch (error) {
    return error;
  }
};

GroupService.prototype.deleteGroup = async function(id) {
  try{
    const group = await this.model.update({
      where: { id },
      returning: true,
      plain: true
    });
    return group[1];
  }catch (error) {
    return error;
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
  }catch (error) {
    return error;
  }
};

module.exports = GroupService;
