const districts = require("../../districts");
const embedModels = require("../embedModels");
const dmOrNot = require("../helper/dmOrNot");

menu = (mssg, client) => {
  let desc1 = "\n";
  let desc2 = "\n";
  let age = ["18-45", "Above 45"];
  let pin = "\nEnter 6 digit pincode \n";
  //generating district list
  for (let i = 0; i < districts.length; i++) {
    desc1 = `${desc1} ${i + 1}. ${districts[i]} \n`;
  }

  //send DM about reg details
  client.users.cache
    .get(mssg.author.id)
    .send({ embed: embedModels("district", "", desc1) });

  //generating age group list
  for (let i = 0; i < age.length; i++) {
    desc2 = `${desc2} ${i + 1}. ${age[i]} \n`;
  }

  //send DM about age group details
  client.users.cache
    .get(mssg.author.id)
    .send({ embed: embedModels("age", "", desc2) });

  //send DM about pincode details
  client.users.cache
    .get(mssg.author.id)
    .send({ embed: embedModels("pin", "", pin) });

  //respond in channel
  if (mssg.channel.type !== "dm") {
    mssg.reply({
      embed: embedModels(
        "general",
        "Pinged you",
        `${dmOrNot(mssg)} 
        \nYou are registered \n Check DM for further details`
      ),
    });
  }
  return;
};

module.exports = menu;
