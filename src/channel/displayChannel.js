const embedModels = require("../messages/formatting/embedModels");

display = async (client, descArr, district) => {
  //find channel to display message
  let value;
  let channel = client.channels.cache.find((channel) => {
    value = false;
    if (channel.parent != null) {
      value =
        channel.name === district && channel.parent.name === "notification";
    }
    return value;
  });

  if (value === false) {
    console.log(`channel ${district} doesn't exist`);
    return;
  }

  //fetch all messages from the channel
  let messages;
  try {
    messages = await channel.messages.fetch({ limit: 100 });
  } catch {
    (e) =>
      console.log(`${e.name} - unable to fetch messages from ${channel.name}`);
  }

  let res;
  //delete all messages in the channel
  try {
    let size = messages.size;
    await channel.bulkDelete(size);
    console.log(`deleted all messages in ${channel.name}`);
  } catch {
    (e) =>
      console.log(`${e.name} - unable to delete messages in ${channel.name}`);
  }

  //replying with centers
  channel.send({
    embed: embedModels(
      "general",
      `Available vaccination centers`,
      `\n${descArr[0]}`
    ),
  });

  if (descArr.length > 1) {
    //if there is a splitting
    for (let i = 1; i < descArr.length; i++) {
      //replying with centers
      channel.send({
        embed: embedModels("general", `Continued`, `\n${descArr[i]}`),
      });
    }
  }

  console.log(`sent updates to ${channel.name}`);
};

module.exports = display;
