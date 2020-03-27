const Sequelize = require("sequelize");
const config = require("../config/dbconfig");
const winstonLogger = require('./middleware/winstonLogger');

const sequelize = new Sequelize(
  config.database,
  config.userName,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    protocol: config.protocol,
    dialectOptions:config.dialectOptions
  }
);

sequelize.authenticate().then(
  suceess => {
    winstonLogger.suceess('success',suceess);
  },
  error => {
    winstonLogger.error('Error',error);
  }
);

module.exports = sequelize;