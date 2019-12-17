const express = require('express');
const database = require('./db');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
const port = process.env.PORT || 8080;
const router = express.Router();  

function appStart(req, res){
  res.json({ message: 'Server Working!!' });
}

router.get('/users/:id', (request, response) => {
  const user = database.getUserById(request);
  response.json({ data: user }); 
});

router.get('/allUsers', (request, response) => {
  const users = database.db;
  response.send({ data: users });
});

router.post('/user',(req, res) => {
  database.createUser(req);
  res.json({ data: 'User created successfully!' }); 
});

router.get('/search/:id', (req, res)=>{
  const user = database.searchById(req.params.id);
  res.json({ data: user }); 
})

router.delete('/delete/:id',(req, res)=> {
  database.deleteById(req.params.id);
  res.json({data:'deleted successfully!'});
});

router.put('/update',(req, res)=> {
  database.updateUser(req);
  res.json({data:'updated successfully!'});
});

router.get('/', appStart);

app.use('/homework', router);
app.listen(port);

