const districts = require("../../districts");
const embedModels = require("../embedModels");
const dmOrNot = require("../helper/dmOrNot");

menu = (mssg, client) => {
  let desc = "\n";
  let age = ["18-45", "Above 45"];
  let pinMssg = "\nEnter 6 digit pincode \n";
  //generating district list
  for (let i = 0; i < districts.length; i++) {
    desc = `${desc} ${i + 1}. ${districts[i]} \n`;
  }

  //send DM about reg details
  client.users.cache
    .get(mssg.author.id)
    .send({ embed: embedModels("district", "", desc) });
  console.log(`${mssg.author.id} : district menu sent as DM`);

  desc = "\n";
  //generating age group list
  for (let i = 0; i < age.length; i++) {
    desc = `${desc} ${i + 1}. ${age[i]} \n`;
  }

  //send DM about age group details
  client.users.cache
    .get(mssg.author.id)
    .send({ embed: embedModels("age", "", desc) });
  console.log(`${mssg.author.id} : age group menu sent as DM`);

  //send DM about pincode details
  client.users.cache
    .get(mssg.author.id)
    .send({ embed: embedModels("pin", "", pinMssg) });
  console.log(`${mssg.author.id} : enter pin message sent`);

  //respond in channel
  if (mssg.channel.type !== "dm") {
    mssg.reply({
      embed: embedModels(
        "general",
        "Pinged you",
        `${dmOrNot(mssg)} \n\n Check DM for further details`
      ),
    });
    console.log(`${mssg.author.id} : responded in channel to menu request`);
  }
  return;
};

module.exports = menu;
