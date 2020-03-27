const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const secret = require("../constants").JWT_SECRET_KEY;
const userModel = require("../database/models").Users;
const UserService = require("../services/userService");

const userService = new UserService(userModel);

const payloadSchema = Joi.object({
  id: Joi.string().required(),
  password:Joi.string().required(),
});

router.get("/", validator.body(payloadSchema), (req, res,next) => {
  userService.getUser(req.body.id).then(users => {
      if(!users  || users.password !== req.body.password){
          return res.status(401).send('Unauthorized user');
      }
      const token = jwt.sign({login:users.login,id:users.id},secret);
    res.send(token);
  }).catch(error => {
    next(error);
   });
});

router.all("*", (req, res) => {
  return res.status(404).end();
});

module.exports = router;