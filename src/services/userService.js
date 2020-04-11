const Sequelize = require('sequelize');

function UserService(model) {
  this.model = model;
}

UserService.prototype.createUser = async function(user) {
  try{
    const data = await this.model.create(user);
    return data.dataValues; 
  } catch (error) {
    return error;
  }
};

UserService.prototype.getUser = async function(id) {
  try{
    const data = await this.model.findOne({
      where: { id }
    });
    return data;
  } catch (error) {
    return error;
  }
};

UserService.prototype.deleteUser = async function(id) {
  try {
    const user = await this.model.update(
      { isDeleted: true },
      {
        where: { id },
        returning: true,
        plain: true
      }
    );
    return user[1];
  } catch (error) {
    return error;
  }
};

UserService.prototype.updateUser =  async function(id, payload) {
  try {
    const user = await this.model.update(payload, {
      where: { id, isDeleted: false },
      returning: true,
      plain: true
    });
    return user ? user[1] : null;
  } catch (error) {
    return error;
  }
};

UserService.prototype.searchUser = async function(limit, query) {
  try{
    const iLike = Sequelize.Op.iLike;
    const users = await this.model.findAll({
      limit: limit,
      where: { login: { [iLike]: query + "%" }, isDeleted: false }
    });
    return users;
  } catch (error) {
    return error;
  }
};

module.exports = UserService;
