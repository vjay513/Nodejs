const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

// const GroupUsersModel = require("../database/models").GroupUsers;
const GroupModel = require("../models").Groups;
const UserModel = require("../models").Users;
const UserGroupService = require("../services/userGroupService");

const userGroupService = new UserGroupService(UserModel,GroupModel);
const bodySchema = Joi.object().keys({
    group: Joi.string().required(),
    users: Joi.array().required(),
  });

router.post("/", validator.body(bodySchema), (req, res, next) => {
  userGroupService.addUsersToGroup(req.body).then(group => {
    res.send(group);
  }).catch(error => {
    next(error);
   });
});

router.all("*", (req, res) => {
  return res.status(404).end();
});

module.exports = router;
