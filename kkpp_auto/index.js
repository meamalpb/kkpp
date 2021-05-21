const districtListApi =
  "https://cdn-api.co-vin.in/api/v2/admin/location/districts/17";
const districtApi = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=`;
const axios = require("axios");
const cron = require("node-cron");
const date = new Date();
const day = require("../src/messages/formatting/today");
const newInfo = [];
const Discord = require("discord.js");
const client = new Discord.Client();
const centers = require("./formatting/centers");
require("dotenv").config();
//cron.schedule("* * * * * *", async () => {
console.log("running a task");
client.on("ready", async () => {
  console.log(`${client.user.tag} is ready`);
});

hello = async () => {
  let districtList = await axios.get(districtListApi, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
    },
  });
  console.log(districtList.data);
  districtList = districtList.data.districts;

  for (i = 0; i < districtList.length; i++) {
    let districtInfo = await axios.get(
      `${districtApi}${districtList[i].district_id}&date=${day(date)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
        },
      }
    );

    newInfo.push(districtInfo.data);
    centers(day(date), districtInfo.data, client);
  }
  console.log("done");
};
hello();
//});
client.login(process.env.BOT_TOKEN);
