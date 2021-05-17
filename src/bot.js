require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const axios = require("axios");

const districts = require("./districts");
const mssgParser = require("./messages/mssgParser");
const cmdHandler = require("./messages/cmdHandler");
const users = require("./helpers/model");

client.on("ready", async () => {
  console.log(`${client.user.tag} is ready`);
  users.sync();
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  console.log(`${message.author.tag} : ${message.content}`);
  [cmd, args] = mssgParser(message);
  if (cmd) {
    cmdHandler(cmd, args, message, client);
  }
});

//  axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/districts/17',
//      {
//          headers: {
//              'User-Agent':
//              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0',
//          },
//      }
//  )

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

