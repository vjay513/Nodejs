const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

const userModel = require("../models").Users;
const UserService = require("../services/userService");

const userService = new UserService(userModel);
const limit = 10;
const queryParamSchema = require("../middlewares/validators").queryParamSchema;

router.get("/", validator.query(queryParamSchema), (req, res) => {
  const query = req.query.query;
  const limit = req.query.limit || limit;
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