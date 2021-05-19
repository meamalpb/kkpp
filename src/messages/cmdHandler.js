const embedModels = require("./embedModels");
const filters = require("./commands/filters");
const menu = require("./commands/menu");
const checkfilter = require("./commands/checkfilter");
const dmOrNot = require("./helper/dmOrNot");
const users = require("../database/model");
const insert = require("../database/insert");

cmdHandler = async (cmd, args, mssg, client) => {
  //if command is filter
  if (cmd === "register") {
    //if there are no args
    if (!args.length) {
      await insert(mssg);
      return;
    }

    //if args are present
    else {
      console.log(
        `${mssg.author.id} : args are not allowed with command - ${cmd}`
      );
      mssg.reply({
        embed: embedModels("general", "Invalid arguments", `${dmOrNot(mssg)}`),
      });
      return;
    }
  }

  //if command is to print menu
  else if (cmd === "menu") {
    if (!args.length) {
      menu(mssg, client);
      return;
    }

    //if args are present
    else {
      console.log(
        `${mssg.author.id} : args are not allowed with command - ${cmd}`
      );
      mssg.reply({
        embed: embedModels("general", "Invalid arguments", `${dmOrNot(mssg)}`),
      });
      return;
    }
  }

  //if command = districts | age group | pincode
  else if ((cmd === "district") | (cmd === "pin") | (cmd === "group")) {
    // if more than 1 arg is provided
    if ((args.length > 1) | (args.length < 1)) {
      console.log(`${mssg.author.id} : arguments invalid for command - ${cmd}`);
      mssg.reply({
        embed: embedModels("general", "Invalid arguments", `${dmOrNot(mssg)}`),
      });
      return;
    }

    let arg = parseInt(args[0]);

    //if arg gives a valid district
    if ((cmd === "district") & (arg > 0) & (arg < 15)) {
      filters(cmd, arg, mssg);
      return;
    }

    //if arg gives a valid age group
    if ((cmd === "group") & (arg > 0) & (arg < 3)) {
      filters(cmd, arg, mssg);
      return;
    }

    //if arg gives a valid pincode
    if ((cmd === "pin") & (args[0].length === 6)) {
      filters(cmd, args[0], mssg);
      return;
    }

    //if arg is faulty
    else {
      console.log(
        `${mssg.author.id} : arguments are invalid for command - ${cmd}`
      );
      mssg.reply({
        embed: embedModels("general", "Invalid arguments", `${dmOrNot(mssg)}`),
      });
      return;
    }
  }

  //command to search for available slots based on district
  else if (cmd === "checkd" || cmd === "checkda") {
    const row = await users.findOne({
      where: { username: mssg.author.id },
    });
    //if user exists
    if (row) {
      const did = row.get("district_id");
      const group = row.get("age_group");
      checkfilter(mssg, cmd, did, group);
      return;
    }

    //if user is not registered
    console.log(`${mssg.author.id} : user not registered`);
    mssg.reply({
      embed: embedModels(
        "general",
        "User not registered",
        `${dmOrNot(mssg)}\n\nUse command : _register`
      ),
    });
    return;
  }

  //command to search for slots based on pin
  else if (cmd === "checkp" || cmd === "checkpa") {
    const row = await users.findOne({
      where: { username: mssg.author.id },
    });
    //if user exists
    if (row) {
      const pin = row.get("pin");
      const group = row.get("age_group");
      checkfilter(mssg, cmd, pin, group);
      return;
    }

    //if user is not registered
    console.log(`${mssg.author.id} : user not registered`);
    mssg.reply({
      embed: embedModels(
        "general",
        "User not registered",
        `${dmOrNot(mssg)}\n\nUse command : _register`
      ),
    });
    return;
  }

  //if no such command exists
  console.log(`${mssg.author.id} : command ${cmd} does not exist`);
  mssg.reply({
    embed: embedModels(
      "general",
      "Command invalid",
      `${dmOrNot(mssg)} \n\n type _help to find commands`
    ),
  });
  return;
};

module.exports = cmdHandler;
