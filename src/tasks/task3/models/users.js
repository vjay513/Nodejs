const Sequelize = require("sequelize");

const users = {
    login: { type: Sequelize.STRING, allowNull: false },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        validatePassword: function(value) {
          if (!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/i.test(value)) {
            throw new Error("Password does not meets the requirements");
          }
        }
      }
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: { min: 4, max: 130 }
    },
    id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    isDeleted: { type: Sequelize.BOOLEAN, defaultValue: false }
  }

  module.exports = users;

