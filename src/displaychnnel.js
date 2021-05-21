var district = "hii";
display = (client, messag) => {
  const channel = client.channels.cache.find((channel) => {
    value = false;
    if (channel.parent != null) {
      value =
        channel.name === "thrissur" && channel.parent.name === "notification";
    }

    return value;
  });
  var i;
  channel.messages
    .fetch({ limit: 100 })
    .then((messages) => {
      i = messages.size;
      console.log(messages);
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
      channel.send(messag);
    })
    .catch((err) => {
      console.log("error");
    });
};
module.exports = display;
