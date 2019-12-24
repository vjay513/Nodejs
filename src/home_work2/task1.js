const express = require('express');
const collection = require('./db');
const bodyQuerySchema = require('./validations');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
const router = express.Router();

const validator = require('express-joi-validation').createValidator({})

const queryParamSchema = Joi.object({
  query: Joi.string().required()
});

function appStart(req, res){
  res.json({ message: 'Server Working!!' });
}

router.get('/users/:id', (request, response) => {
  const user = collection.getUserById(request);
  response.json({ data: user });
});

router.get('/allUsers', (request, response) => {
  const users = collection.getDatabase();
  response.send({ data: users });
});

router.post('/user',validator.body(bodyQuerySchema),(req, res) => {
  collection.createUser(req);
  res.json({ data: 'User created successfully!' });
});

router.get('/search/:id',  (req, res)=> {
  const user = collection.searchById(req.params.id);
  res.json({ data: user }); 
})

router.delete('/delete/:id',(req, res)=> {
  collection.deleteById(req.params.id);
  res.json({data:'Deleted successfully!'});
});

router.put('/update',(req, res)=> {
  collection.updateUser(req);
  res.json({data:'Updated successfully!'});
});

router.get('/', appStart);

app.use('/homework', router);
app.listen(port);

