const Discord     = require("discord.js");
const axios       = require("axios");
const districts   = require("./districts");
const mssgParser  = require("./messages/mssgParser");
const cmdHandler  = require("./messages/cmdHandler");
const client      = new Discord.Client();
require("dotenv").config();

//check if client is ready
client.on("ready", async () => {
  console.log(``);
});


//on user input
client.on("message", async (message) => {
  if (message.author.bot) return;

  [cmd, args] = mssgParser(message);
  if (cmd) {
    cmdHandler(cmd, args, message, client);
  }
});


client.login(process.env.BOT_TOKEN);
