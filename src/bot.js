const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();
const dmOrNot = require("./messages/formatting/dmOrNot");
const embedModels = require("./messages/formatting/embedModels");
const mssgParser = require("./messages/mssgParser");
const cmdHandler = require("./messages/commands/cmdHandler");
const users = require("./database/model");
const setup = require("./messages/commands/setup");
let flag;

//runs when client is ready
client.on("ready", async () => {
  console.log(`${client.user.tag} is ready`);
  users.sync();
  flag = 0;
});

//runs on user input
client.on("message", async (message) => {
  if (message.author.bot) return;
  console.log(`${message.author.id} : ${message.content}`);
  [cmd, args] = mssgParser(message);

  //only help can run before setup
  if (cmd === "help") {
    cmdHandler(cmd, args, message, client);
    return;
  }

  //setup needs to run first, hence flag must be greater than 0 for other commands
  if ((flag != 0) | (message.channel.type === "dm")) {
    //if dm channel
    if (cmd != "setup") {
      cmdHandler(cmd, args, message, client);
      return;
    }

    //if setup is sent as dm
    else if (message.channel.type === "dm") {
      message.reply({
        embed: embedModels(
          "general",
          "Invalid command",
          `${dmOrNot(message)} \n\nCommand cant be used as DM`
        ),
      });
    }

    return;
  }

  //if setup is called
  if (cmd === "setup") {
    //if no arguments
    if (args.length === 0) {
      //if admin
      if (message.member.hasPermission("ADMINISTRATOR")) {
        flag = 1;
        setup(client, message);
      }
      //not an admin
      else {
        message.reply({
          embed: embedModels(
            "general",
            "No permission",
            `${dmOrNot(message)} \n\nCommand reserved for admin`
          ),
        });
      }
    }
    //if there are arguments
    else {
      message.reply({
        embed: embedModels(
          "general",
          "Invalid Command",
          `${dmOrNot(
            message
          )} \n\nNo arguments are allowed\nUse command : _help`
        ),
      });
    }
    //not an admin
    return;
  }

  //some other command before _setup
  else if (cmd) {
    message.reply({
      embed: embedModels(
        "general",
        "Bot not setup",
        `${dmOrNot(
          message
        )} \n\nAdmin needs to set up the bot.\n Use command : _setup`
      ),
    });
    return;
  }
});

//keeps the bot online using the BOT_TOKEN
client.login(process.env.BOT_TOKEN);
