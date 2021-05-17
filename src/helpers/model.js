const sequelize = require("../connection");
const Sequelize = require("sequelize");
const users = sequelize.define("users", {
  username: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  district: {
    type: Sequelize.STRING,
  },
  district_id: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  age_group: {
    type: Sequelize.INTEGER,
  },
  pin: {
    type: Sequelize.STRING,
  },
});
module.exports = users;
