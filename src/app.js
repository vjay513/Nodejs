const express = require("express");
const bodyParser = require("body-parser");

const suggestRoutes = require("./routers/suggestionRoutes");
const userRoutes = require("./routers/userRoutes");
const groupRoutes = require("./routers/groupRoutes");
const userGroupRoutes = require("./routers/userGroupRoutes");

const sequelize = require('./models').sequelize;

const app = express();

const PORT = process.env.PORT || "3001";

app.use(bodyParser.json());

app.use('/users', suggestRoutes);

app.use('/user', userRoutes);


app.use('/group', groupRoutes);

app.use("/usergroup",userGroupRoutes)

app.all("*", (req, res) => {
  return res.status(404).end();
});

sequelize.sync().then(function() {
  app.listen(PORT,() => {
    console.log("Server listening on port number ", PORT);
  });
});
