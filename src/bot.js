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

  if (!cmd) return;

  if (message.channel.type === "dm") {
    if (cmd === "setup") {
      message.reply({
        embed: embedModels(
          "general",
          "Invalid command",
          `${dmOrNot(message)} \n\nCommand cant be used as DM`
        ),
      });
      return;
    }
    flag = cmdHandler(cmd, args, message, client, 1);
    return;
  }

  flag = cmdHandler(cmd, args, message, client, flag);
  return;
});

//keeps the bot online using the BOT_TOKEN
client.login(process.env.BOT_TOKEN);
