const embedModels = require("../formatting/embedModels");
const filters = require("./filters");
const list = require("./list");
const slots = require("./slots");
const dmOrNot = require("../formatting/dmOrNot");
const users = require("../../database/model");
const insert = require("../../database/insert");
const setup = require("./setup");
const cleanup = require("./cleanup");

const isNumber = (num) => {
  for (let i = 0; i < num.length; i++) {
    if (!Number.isInteger(parseInt(num[i]))) return false;
  }
  return true;
};

//function that uses embedModels for invalid arguments.
const InvalidArgs = (mssg, desc) => {
  mssg.reply({
    embed: embedModels(
      "general",
      "Invalid arguments",
      `${dmOrNot(mssg)}\n\n${desc}`
    ),
  });
  return;
};

//command is sync or desync
cmdHandler = async (cmd, args, mssg, client) => {
  if ((cmd === "sync") | (cmd === "desync")) {
    if (args.length === 0) {
      //if admin
      if (mssg.member.hasPermission("ADMINISTRATOR")) {
        return;
      }
      //if not admin
      else {
        mssg.reply({
          embed: embedModels(
            "general",
            "No permission",
            `${dmOrNot(mssg)}\n\n Command reserved for admin`
          ),
        });
        return;
      }
    }
    //invalid args
    else {
      InvalidArgs(mssg, `No arguments are allowed\nUse command : _help`);
    }
    return;
  }

  //if command is setup
  if ((cmd === "setup") | (cmd === "cleanup")) {
    if (args.length === 0) {
      //if admin
      if (mssg.member.hasPermission("ADMINISTRATOR")) {
        if (cmd === "setup") setup(client, mssg);
        else if (cmd === "cleanup") await cleanup(mssg);
        return;
      }

      //not an admin
      else {
        mssg.reply({
          embed: embedModels(
            "general",
            "No permission",
            `${dmOrNot(mssg)} \n\nCommand reserved for admin`
          ),
        });
        return;
      }
    }

    //if there are arguments
    else {
      InvalidArgs(mssg, `No arguments are allowed\nUse command : _help`);
      return;
    }
  }

  //if command is help
  if (cmd === "help") {
    mssg.reply({
      embed: embedModels("help", "", `${dmOrNot(mssg)}\n\n`),
    });
    return;
  }

  //if command is register
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
      InvalidArgs(mssg, `Arguments are not allowed.\nUse command : _help`);
      return;
    }
  }

  //if command = district | pin
  if ((cmd === "district") | (cmd === "pin")) {
    // if more than 1 arg is provided
    if (args.length > 1) {
      console.log(`${mssg.author.id} : arguments invalid for command - ${cmd}`);
      InvalidArgs(mssg, `Only 1 argument allowed.\nUse command : _help`);
      return;
    }

    //if no arguments with district, display district list
    if ((cmd === "district") & (args.length === 0)) {
      list(mssg);
      return;
    }

    if ((cmd === "pin") & (args.length === 0)) {
      console.log(`${mssg.author.id} : arguments invalid for command - ${cmd}`);
      InvalidArgs(mssg, `Argument is faulty.\nUse command : _help`);
      return;
    }

    let arg = parseInt(args[0]);

    //if arg is faulty
    if (!isNumber(args[0])) {
      console.log(`${mssg.author.id} : arguments invalid for command - ${cmd}`);
      InvalidArgs(mssg, `Argument is faulty.\nUse command : _help`);
      return;
    }

    //if arg gives a valid district
    if ((cmd === "district") & (arg > 0) & (arg < 15)) {
      filters(cmd, arg, mssg);
      return;
    }

    //if arg gives a valid pincode
    if ((cmd === "pin") & (args[0].length === 6)) {
      filters(cmd, args[0], mssg);
      return;
    }

    //if arg is faulty
    console.log(
      `${mssg.author.id} : arguments are invalid for command - ${cmd}`
    );
    InvalidArgs(mssg, `Argument is faulty.\nUse command : _help`);
    return;
  }

  //command to search for available slots
  if (cmd === "check") {
    //fetch user from database
    const row = await users.findOne({
      where: { username: mssg.author.id },
    });

    //if user exists
    if (row) {
      //if there are either 1 or 2 arguments
      if ((args.length === 1) | (args.length === 2)) {
        //if search is district without age
        if ((args[0] === "d") | (args[0] === "p")) {
          const did = row.get("district_id");
          const pin = row.get("pin");

          let criteria = 0;
          if (args[0] === "d") criteria = did;
          else if (args[0] === "p") criteria = pin;

          //if only 1 argument
          if (args.length === 1) {
            slots(mssg, args[0], criteria, -1);
            return 1;
          }

          //if 2 arguments
          else if (args.length === 2) {
            let age = parseInt(args[1]);
            if (!isNumber(args[1])) {
              //invalid age
              console.log(
                `${mssg.author.id} : invalid age for command - ${cmd}`
              );
              InvalidArgs(mssg, `Age is invalid.\nUse command : _help`);
              return 1;
            }
            slots(mssg, args[0], criteria, age);
            return 1;
          }
          return 1;
        }

        console.log(
          `${mssg.author.id} : Only 'd' or 'p' allowed as first argument for command: ${cmd}`
        );
        InvalidArgs(
          mssg,
          `Only 'd' or 'p' allowed as first argument.\nUse command : _help`
        );
        return 1;
      }

      //args are faulty
      console.log(`${mssg.author.id} : arguments invalid for command - ${cmd}`);
      InvalidArgs(mssg, `Use command : _help`);
      return 1;
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
    return 1;
  }

  //if no such command exists
  console.log(`${mssg.author.id} : command ${cmd} does not exist`);
  mssg.reply({
    embed: embedModels(
      "general",
      "Command invalid",
      `${dmOrNot(mssg)} \n\nUse command : _help`
    ),
  });
  return;
};

module.exports = cmdHandler;
