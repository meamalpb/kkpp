//function to make a channel
deleteChannel = async (client, name, message) => {
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

      try {
        channel.updateOverwrite(client.user.id, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
        });
        channel.updateOverwrite(client.user.id, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
        });
        channel.updateOverwrite(channel.guild.roles.everyone, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
        });
      } catch (e) {
        console.log(`{message.author.id : ${e.name}`);
      }
    })
    .catch((err) => {
      console.log("error is" + err);
    });
};
module.exports = deleteChannel;
