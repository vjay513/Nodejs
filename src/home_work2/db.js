const db = [
    {
        id: "001",
        login: 'user1',
        password:'qwerty@123',
        age:18,
        isDeleted:false
    },{
        id: "002",
        login: 'user2',
        password:'qwerty@123',
        age:19,
        isDeleted:false
    },{
        id: "003",
        login: 'user3',
        password:'qwerty@123',
        age:20,
        isDeleted:false
    },{
        id: "004",
        login: 'user4',
        password:'qwerty@123',
        age:21,
        isDeleted:false
    },{
        id: "005",
        login: 'user5',
        password:'qwerty@123',
        age:22,
        isDeleted:false
    }
]

function getUserById(req){
    const user = db.filter((item)=>{
      return item.id === req.params.id;
    })
    return user;
}

function createUser(req){
    req.body['id'] = UUID();
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

module.exports = { db, getUserById, createUser, searchById, deleteById, updateUser};