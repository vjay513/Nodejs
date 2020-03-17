const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

const userModel = require("../models").Users;
const UserService = require("../services/userService");
const userService = new UserService(userModel);

const userSchema = require("../middlewares/validators").userSchema;

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  userService
    .getUser(id)
    .then(user => {
      if (!user) {
        return res.status(404).end();
      } else {
        res.send(user);
      }
    })
    .catch(error => {
      next(error);
    });
});

router.post("/", validator.body(userSchema), (req, res, next) => {
  const body = req.body;
  userService.createUser(body).then(user => res.send(user)).catch(error => {
    next(error);
   });
});

router.put("/:id", validator.body(userSchema), (req, res, next) => {
  const body = req.body;
  const id = req.params.id;
  userService
  .updateUser(id, body)
  .then(user => {
    if (!user) {
      return res.status(400).end();
    }
    res.send(user);
  })
  .catch(error => {
    next(error);
  });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  userService.deleteUser(id).then(user =>{ if (!user) {
    return res.status(404).end();
  }
  res.send({ success: true });})

}).catch(error => {
  next(error);
 });

router.all("*", (req, res) => {
  return res.status(404).end();
});

module.exports = router;