const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();

const mssgParser = require("./messages/mssgParser");
const cmdHandler = require("./messages/commands/cmdHandler");
const users = require("./database/model");

//runs when client is ready
client.on("ready", async () => {
  console.log(`${client.user.tag} is ready`);
  users.sync();
});

//runs on user input
client.on("message", async (message) => {
  if (message.author.bot) return;
  console.log(`${message.author.id} : ${message.content}`);
  [cmd, args] = mssgParser(message);
  if (cmd) {
    cmdHandler(cmd, args, message, client);
  }
});

//keeps the bot online using the BOT_TOKEN
client.login(process.env.BOT_TOKEN);
