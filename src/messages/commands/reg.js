const districts = require("../../districts");
const embedModels = require("../embedModels");

cmdReg = (mssg, client) => {
  let desc = "\n";

  //generating district list
  for (let i = 0; i < districts.length; i++) {
    desc = `${desc} ${i + 1}. ${districts[i]} \n`;
  }

  //send DM about reg details
  client.users.cache
    .get(mssg.author.id)
    .send({ embed: embedModels("reg", "", desc) });

  //respond in channel
  if (mssg.channel.type !== "dm") {
    mssg.reply({
      embed: embedModels(
        "general",
        "Pinged you",
        `<@!${mssg.author.id}> \n\n Check DM for further details`
      ),
    });
  }
  return;
};

module.exports = cmdReg;
