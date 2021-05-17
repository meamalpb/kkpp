const embedModels = require("./embedModels");
const cmdDistrict = require("./commands/district");
const cmdReg = require("./commands/reg");
const chnnel = require("./commands/dm");
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
        embed: embedModels("general", "invalid arguments", `${chnnel(mssg)}`),
      });
      return;
    }
  }

  //for selecting districts
  else if (cmd === "district") {
    // if more than 1 arg is provided
    if ((args.length > 1) | (args.length < 1)) {
      mssg.reply({
        embed: embedModels("general", "Invalid arguments", `${chnnel(mssg)}`),
      });
      return;
    }

    //if arg gives a valid district
    else if ((parseInt(args[0]) > 0) & (parseInt(args[0]) < 15)) {
      cmdDistrict(cmd, parseInt(args[0]), mssg);
      return;
    }

    //if arg is faulty
    else {
      mssg.reply({
        embed: embedModels("general", "Invalid arguments", `${chnnel(mssg)}`),
      });
      return;
    }
  }

  //for selecting age groups
  else if (cmd === "group") {
    // if more than 1 arg is provided
    if ((args.length > 1) | (args.length < 1)) {
      mssg.reply({
        embed: embedModels("general", "Invalid arguments", `${chnnel(mssg)}`),
      });
      return;
    }

    //if arg gives a valid district
    else if ((parseInt(args[0]) > 0) & (parseInt(args[0]) < 3)) {
      cmdDistrict(cmd, parseInt(args[0]), mssg);
      return;
    }

    //if arg is faulty
    else {
      mssg.reply({
        embed: embedModels("general", "Invalid arguments", `${chnnel(mssg)}`),
      });
      return;
    }
  }

  //for selecting pin
  else if (cmd === "pin") {
    // if more than 1 arg is provided
    if ((args.length > 1) | (args.length < 1)) {
      mssg.reply({
        embed: embedModels("general", "Invalid arguments", `${chnnel(mssg)}`),
      });
      return;
    }

    //if arg gives a valid district
    else if (args[0].length == 6) {
      cmdDistrict(cmd, args[0], mssg);
      return;
    }

    //if arg is faulty
    else {
      mssg.reply({
        embed: embedModels("general", "Invalid arguments", `${chnnel(mssg)}`),
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
      `${chnnel(mssg)} \n\n type _help to find commands`
    ),
  });
  return;
};

module.exports = cmdHandler;
