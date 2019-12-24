const db = [];

function getUserById(req){
    const user = db.filter((item)=>{
      return item.id === req.params.id;
    })
    return user;
}

function createUser(req){
    req.body['id'] = UUID();
    req.body['isDeleted'] = false;
    db.push(req.body);
}

function filterById(id) {
    return db.find((item,index)=>{
        return item.id === id
    });
}

function searchById(id){
    const user = filterById(id);
    return user;
}

function deleteById(id){
    let item = filterById(id);
    item.isDeleted = true;
}

function updateUser(req){
    let item = filterById(req.body.id);
    Object.assign(item,req.body);
}

function UUID() {
    function s(n) {
      return h((Math.random() * (1 << (n << 2))) ^ Date.now()).slice(-n);
    }
    function h(n) {
      return (n | 0).toString(16);
    }
    return [
      s(4) + s(4),
      s(4),
      "4" + s(3), // UUID version 4
      h(8 | (Math.random() * 4)) + s(3), // {8|9|A|B}xxx
      // s(4) + s(4) + s(4),
      Date.now()
        .toString(16)
        .slice(-10) + s(2) // Use timestamp to avoid collisions
    ].join("-");
  }

  function getDatabase(){
      return db;
  }
module.exports = { getDatabase, getUserById, createUser, searchById, deleteById, updateUser};