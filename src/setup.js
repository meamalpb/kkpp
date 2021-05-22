const fetch = require("./api/fetch");
const dmOrNot = require("./messages/formatting/dmOrNot");
const embedModels = require("./messages/formatting/embedModels");
const makeChannel = require("./channel/makeChannel");
setup = async (client, message) => {
  let data = await fetch(
    "https://cdn-api.co-vin.in/api/v2/admin/location/districts/17",
    message
  );

  //if error
  if (!data) {
    //replying with error
    message.reply({
      embed: embedModels(
        "general",
        "Server Error",
        `${dmOrNot(message)} \n\nUnable to fetch from API `
      ),
    });

    return;
  }
  console.log(`${message.author.id} : fetched districts list from API`);
  data = data.districts;
  var categories = message.guild.channels.cache.filter((channel) => {
    value =
      channel.deleted == false &&
      channel.type == "category" &&
      channel.name === "notification";
    return value;
  });
  var k = 0;
  categories.every((ch) => {
    k++;
    return true;
  });
  if (k > 0) {
    console.log("category exists");
  } else {
    message.guild.channels.create("notification", {
      type: "category",
    });
  }
  for (var j = 0; j < data.length; j++) {
    var channels = message.guild.channels.cache.filter((channel) => {
      let value = false;
      if (channel.parent != null) {
        value =
          channel.deleted == false &&
          channel.type === "text" &&
          channel.name === data[j].district_name.toLowerCase() &&
          channel.parent.name === "notification";
      }
      return value;
    });
    var i = 0;
    channels.every((ch) => {
      i++;
      return true;
    });
    if (i > 0) {
      console.log("exists");
    } else {
      makeChannel(client, data[j].district_name, message);
    }
  }
  message.reply("successfully completed");
};
module.exports = setup;
