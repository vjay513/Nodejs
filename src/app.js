const express = require("express");
const bodyParser = require("body-parser");

const suggestRoutes = require("./routers/suggestionRoutes");
const userRoutes = require("./routers/userRoutes");
const groupRoutes = require("./routers/groupRoutes");
const userGroupRoutes = require("./routers/userGroupRoutes");

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const winstonLogger = require('./middleware/winstonLogger');
const jwtValidator = require("./middleware/jwtValidator");

const sequelize = require('./models').sequelize;
const cors = require("cors");

const allowedOrigins = ["http://localhost:3001", "http://example.com"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg =
        "The CORS policy for this site does not " +
        "allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};

const app = express();

const PORT = process.env.PORT || "3001";

app.use(bodyParser.json());
app.use(logger);

app.use(cors(corsOptions));

app.use("/login",jwtValidator, loginRoutes);
app.use('/users', jwtValidator, suggestRoutes);
app.use('/user', jwtValidator, userRoutes);
app.use('/group',jwtValidator,  groupRoutes);
app.use("/usergroup",jwtValidator, userGroupRoutes)

app.use(errorHandler);
app.all("*", (req, res) => {
  return res.status(404).end();
});

process.on('unhandledRejection',(e,origin)=>{
  winstonLogger.error('Winston unhandled rejection Logger...',e,origin);
})

process.on('uncaughtException',(e,origin)=>{
  winstonLogger.error('Winston Uncaught Exception Logger...',e,origin);
})

sequelize.sync().then(function() {
  app.listen(PORT,() => {
    console.log("Server listening on port number ", PORT);
  });
});
