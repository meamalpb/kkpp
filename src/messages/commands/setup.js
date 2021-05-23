const fetch = require("../../api/fetch");
const dmOrNot = require("../formatting/dmOrNot");
const embedModels = require("../formatting/embedModels");
const makeChannel = require("../../channel/makeChannel");

//setup function to initialize channel and categories
setup = async (client, message) => {
  //fetch list of districts
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

  //find all categories with name "notification"
  let categories = message.guild.channels.cache.filter((category) => {
    value =
      category.deleted === false &&
      category.type === "category" &&
      category.name === "notification";
    return value;
  });

  //count no of categories
  let k = 0;
  categories.every((ch) => {
    k++;
    return true;
  });

  //to check if notification category exists
  if (k > 0) {
    console.log(`${message.author.id} : category notification exists`);
  }

  //else create notification category
  else {
    message.guild.channels.create("notification", {
      type: "category",
    });
    console.log(`${message.author.id} : category notification created`);
  }

  //iterate through districtList
  for (let j = 0; j < data.length; j++) {
    //find collection of channels with the district name data[j].district_name and unde category "notification"
    let channels = message.guild.channels.cache.filter((channel) => {
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

    //count no of channels in the collection
    let i = 0;
    channels.every((ch) => {
      i++;
      return true;
    });

    //if channel already exists
    if (i > 0) {
      console.log(
        `${message.author.id} : channel ${data[j].district_name} exists`
      );
    }

    //make channel
    else {
      await makeChannel(client, data[j].district_name, message);
      console.log(
        `${message.author.id} : channel ${data[j].district_name} created`
      );
    }
  }

  //reply after process is completed
  console.log(`${message.author.id} : setup complete`);
  message.reply({
    embed: embedModels("general", "Setup complete", `${dmOrNot(message)}`),
  });
  return;
};
module.exports = setup;
