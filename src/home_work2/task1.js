import * as Joi from '@hapi/joi';
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

router.get('/users/:id',validator.body(bodyQuerySchema), (request, response) => {
  const user = collection.getUserById(request);
  if (!user) {
    return response.status(404).end();
  }else{
    return response.json({ data: user });
  }
});


app.get("/users", validator.query(queryParamSchema), (req, res) => {
  const query = req.query.query;
  const limit = req.query.limit || 10;
  if (!query) {
    return res.status(404).end();
  }
  return res.send(collection.searchUser(query, limit));
});


router.post('/user',validator.body(bodyQuerySchema),(req, res) => {
  collection.createUser(req);
  res.json({ data: 'User created successfully!' });
});

router.get('/search/:id',  (req, res)=> {
  const user = collection.searchById(req.params.id);
  if (!user) {
    return response.status(404).end();
  }else{
    return response.json({ data: user }); 
  }
  
})

router.delete('/delete/:id',(req, res)=> {
  collection.deleteById(req.params.id);
  res.json({data:'Deleted successfully!'});
});

router.put("/user/:id", validator.body(bodyQuerySchema),(req, res)=> {
 let user =  collection.updateUser(req);
  if (!user) {
    return response.status(404).end();
  }
  return res.json({data:'Updated successfully!'});
});

router.get('/', appStart);

app.use('/homework', router);
app.listen(port);

