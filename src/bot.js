const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();
const dmOrNot = require("./messages/formatting/dmOrNot");
const embedModels = require("./messages/formatting/embedModels");
const mssgParser = require("./messages/mssgParser");
const cmdHandler = require("./messages/commands/cmdHandler");
const users = require("./database/model");
const setup = require("./setup");
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
  if (flag != 0) {
    if (cmd) {
      if (cmd != "setup") {
        cmdHandler(cmd, args, message, client);
        return;
      }
    }
  }
  if (cmd === "setup" && args.length == 0) {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      console.log("Admin");
      flag++;
      setup(client, message);
    } else {
      message.reply({
        embed: embedModels(
          "general",
          "Server Error",
          `${dmOrNot(message)} \n\nYou are not an admin `
        ),
      });
    }
    return;
  } else if (cmd) {
    message.reply({
      embed: embedModels(
        "general",
        "Server Error",
        `${dmOrNot(
          message
        )} \n\nAdmin needs to set up channels using _setup first`
      ),
    });
    return;
  }
});

//keeps the bot online using the BOT_TOKEN
client.login(process.env.BOT_TOKEN);
