const users = require("./model");
const embedModels = require("../messages/formatting/embedModels");

//function to insert user to a database
insert = async (mssg) => {
  try {
    await users.create({ username: mssg.author.id });

    //user registered
    console.log(`${mssg.author.id} : registered`);
    mssg.reply({
      embed: embedModels(
        "general",
        "Registered",
        `${dmOrNot(mssg)} \n\nRegistration successful. Welcome onboard.`
      ),
    });
    return;
  } catch (e) {
    //if user already registered
    if (e.name === "SequelizeUniqueConstraintError") {
      console.log(`${mssg.author.id} : already registered`);
      mssg.reply({
        embed: embedModels(
          "general",
          "Already registered",
          `${dmOrNot(mssg)} \n\nYou are already registered `
        ),
      });
    }

    //some other error
    else {
      console.log(`${mssg.author.id} : ${e.name}`);
      mssg.reply({
        embed: embedModels(
          "general",
          "Server Error",
          `${dmOrNot(mssg)} \n\nError in registration `
        ),
      });
    }
    return;
  }
};

module.exports = insert;
