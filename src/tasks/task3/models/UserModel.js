const uuid = require("uuid/v4");
const Sequelize = require("sequelize");
const dbConnector = require("../middlewares/dbConnector");
const users = require("./users")

const User = dbConnector.define(
  "users",users,
  { freezeTableName: true }
);

User.sync();

async function findOne(id) {
  let user = await User.findOne({
    where: { id }
  });
  return user;
}

async function create(user) {
  try{
  let data = await User.create(user);
  return data.dataValues;
  }catch(exe){
    console.log(exe);
  }
}

async function remove(id) {
  let user = await User.update(
    { isDeleted: true },
    {
      where: { id },
      returning: true,
      plain: true
    }
  );
  return user[1];
}

async function update(id, updatedUser) {
  try {
    let user = await User.update(updatedUser, {
      where: { id, isDeleted: false },
      returning: true,
      plain: true
    });
    return user ? user[1] : null;
  } catch (exe) {
    return null;
  }
}

async function findAll(login, limit) {
  let iLike = Sequelize.Op.iLike;
  let users = await User.findAll({
    limit: limit,
    where: { login: { [iLike]: login + "%" }, isDeleted: false }
  });
  return users;
}

module.exports = { create, update, findOne, findAll, remove };