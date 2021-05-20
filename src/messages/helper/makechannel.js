const Discord = require("discord.js");
makeChannel = (client, message, name) => {
  // const guild = new Discord.Guild(client, { hello: 1 });
  /*guild.channels
    .create("district", {
      type: "text",
      permissionOverwrites: [
        {
          id: message.guild.roles.everyone,
          allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
        },
      ],
    })
    .then(console.log("hii"))
    .catch((err) => {
      console.log("error is" + err);
    });*/
  message.guild.channels
    .create(name, {
      type: "text",
    })
    .then((channel) => {
      console.log(channel.name);
    })
    .catch((err) => {
      console.log("error is" + err);
    });

  console.log("mm");
};
module.exports = makeChannel;
