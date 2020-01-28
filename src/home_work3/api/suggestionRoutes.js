let express = require("express");
let router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

let userModel = require("../models/UserModel");
let UserService = require("../services/userService");

let userService = new UserService(userModel);

const queryParamSchema = Joi.object({
  query: Joi.string().required()
});

router.get("/", validator.query(queryParamSchema), (req, res) => {
  const query = req.query.query;
  const limit = req.query.limit || 10;
  if (!query) {
    return res.status(404).end();
  }
  userService.searchUser(query, limit).then(users => {
    res.send(users);
  });
});

router.all("*", (req, res) => {
  return res.status(404).end();
});

module.exports = router;