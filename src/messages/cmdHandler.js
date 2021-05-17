const embedModels = require("./embedModels");
const filters = require("./commands/filters");
const menu = require("./commands/menu");
const dmOrNot = require("./helper/dmOrNot");
const { isNumber } = require("lodash");

cmdHandler = (cmd, args, mssg, client) => {
  //if command is filter
  if (cmd === "filter") {
    //if there are no args
    if (!args.length) {
      menu(mssg, client);
      return;
    }

    //if args is present
    else {
      mssg.reply({
        embed: embedModels("general", "invalid arguments", `${dmOrNot(mssg)}`),
      });
      return;
    }
  }

  //if command = districts | age group | pincode
  else if ((cmd === "district") | (cmd === "pin") | (cmd === "group")) {
    // if more than 1 arg is provided
    if ((args.length > 1) | (args.length < 1)) {
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
      mssg.reply({
        embed: embedModels("general", "Invalid arguments", `${dmOrNot(mssg)}`),
      });
      return;
    }
  }

  //if no such command exists
  let model = embedModels.errorModel;
  mssg.reply({
    embed: embedModels(
      "general",
      "Error!!",
      `${dmOrNot(mssg)} \n\n type _help to find commands`
    ),
  });
  return;
};

module.exports = cmdHandler;
