const embedModels = require("./embedModels");
const cmdDistrict = require("./commands/district");
const cmdReg = require("./commands/reg");

cmdHandler = (cmd, args, mssg, client) => {
  //if command is reg or edit
  if ((cmd === "reg") | (cmd === "edit")) {
    //if there are no args
    if (!args.length) {
      cmdReg(mssg, client);
      return;
    }

    //if args is not present
    else {
      mssg.reply({
        embed: embedModels(
          "general",
          "invalid arguments",
          `<@!${mssg.author.id}>`
        ),
      });
      return;
    }
  }

  //for selecting districts
  else if (cmd === "district") {
    // if more than 1 arg is provided
    if ((args.length > 1) | (args.length < 1)) {
      mssg.reply({
        embed: embedModels(
          "general",
          "Invalid arguments",
          `<@!${mssg.author.id}>`
        ),
      });
      return;
    }

    //if arg gives a valid district
    else if ((parseInt(args[0]) > 0) & (parseInt(args[0]) < 15)) {
      cmdDistrict(parseInt(args[0]), mssg);
      return;
    }

    //if arg is faulty
    else {
      mssg.reply({
        embed: embedModels(
          "general",
          "Invalid arguments",
          `<@!${mssg.author.id}>`
        ),
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
      `<@!${mssg.author.id}> \n\n type _help to find commands`
    ),
  });
  return;
};

module.exports = cmdHandler;
