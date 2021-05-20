const Discord = require("discord.js");

//function to make a channel
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
      let category = message.guild.channels.cache.find((c) => {
        value = c.name === "notification" && c.type === "category";
        return value;
      });
      if (!category) throw new Error("Category channel does not exist");
      channel.setParent(category.id);
      console.log(`${channel.name} channel created`);
    })
    .catch((err) => {
      console.log("error is" + err);
    });
};
module.exports = makeChannel;
