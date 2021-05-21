const connection = require("./connection");
const sequelize = require("sequelize");

//database model
const users = connection.define("users", {
  username: {
    type: sequelize.STRING,
    primaryKey: true,
  },
  district: {
    type: sequelize.STRING,
  },
  district_id: {
    type: sequelize.INTEGER,
  },
  pin: {
    type: sequelize.STRING,
  },
});

module.exports = users;
