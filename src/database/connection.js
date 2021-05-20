const sequelize = require("sequelize");

//database config
const connection = new sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

module.exports = connection;
