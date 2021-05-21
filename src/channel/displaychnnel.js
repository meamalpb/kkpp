const embedModels = require("../messages/formatting/embedModels");
display = (client, messag, channl, j) => {
  const channel = client.channels.cache.find((channel) => {
    value = false;
    if (channel.parent != null) {
      value = channel.name === channl && channel.parent.name === "notification";
    }
    console.log(value);
    return value;
  });
  var i;
  channel.messages
    .fetch({ limit: 100 })
    .then((messages) => {
      i = messages.size;
      console.log(messages);
      if (j == 1) {
        if (i != 0) {
          channel
            .bulkDelete(i)
            .then((mess) => {
              console.log("deleted all messages");
            })
            .catch((err) => {
              console.log("error is" + err);
            });
        }
      }
      channel.send({ embed: embedModels("general", `Continued`, messag) });
    })
    .catch((err) => {
      console.log("error");
    });
};
module.exports = display;
