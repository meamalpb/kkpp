const Discord     = require("discord.js");
const axios       = require("axios");
const districts   = require("./districts");
const mssgParser  = require("./messages/mssgParser");
const cmdHandler  = require("./messages/cmdHandler");
const client      = new Discord.Client();
require("dotenv").config();
const users = require("./helpers/model");


//check if client is ready
client.on("ready", async () => {
  console.log(`${client.user.tag} is ready`);
  users.sync();
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
/*const uname = "hiiii";
const d = "THri";
const id = 1;
const age = 30;
const p = "09";
try {
  const user = users.create({
    username: uname,
    district: d,
    district_id: id,
    age_group: age,
    pin: p,
  });
  console.log(user.username);
} catch (e) {
  if (e.name === "SequelizeUniqueConstraintError") {
    console.log("That tag already exists.");
  }
  console.log("Something went wrong with adding a tag." + e);
}
const userslist = users.findAll({ attributes: ["username"] });
console.log(`list:${userslist}`);*/

