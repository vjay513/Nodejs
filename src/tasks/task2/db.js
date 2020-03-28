const uuid = require('uuid/v1');
const db = [];

const getUserById= (req) => {
    const user = db.filter((item)=>{
      return item.id === req.params.id;
    })
    return user;
}

const createUser = (req) => {
    req.body['id'] = uuid();
    req.body['isDeleted'] = false;
    db.push(req.body);
}

const filterById = (id) => {
    return db.find((item,index)=>{
        return item.id === id
    });
}

const searchById = (id) => {
    const user = filterById(id);
    return user;
}

const deleteById = (id) => {
    const item = filterById(id);
    item.isDeleted = true;
}

const updateUser = (req) => {
    const item = filterById(req.body.id);
    return Object.assign(item,req.body);
}


const searchUser = (login,limit)=> {
  let requestedUsers = db.filter(user => {
    return user.login.indexOf(login) !== -1;
  })
  return requestedUsers.length <= limit ? requestedUsers : requestedUsers.slice(0,limit);
}

module.exports = { getUserById, createUser, searchById, deleteById, updateUser, searchUser};