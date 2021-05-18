const users = require("./model");
const dmOrNot = require("../messages/helper/dmOrNot");

//function to insert user to a database
insert = async (mssg) => {
  try {
    await users.create({ username: mssg.author.id });
    data = true;
  } catch (e) {
    data = e;
  }

  return new Promise((resolve) => {
    resolve(data);
  });
};

module.exports = insert;
