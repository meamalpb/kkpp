const fetch = require("../../api/fetch");
const dmOrNot = require("../formatting/dmOrNot");
const embedModels = require("../formatting/embedModels");

//cleanup function to initialize channel and categories
cleanup = async (message) => {
  //fetch districts list
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

  //find all categories with name "kkpp-notification"
  let categories = message.guild.channels.cache.filter((category) => {
    value =
      category.deleted === false &&
      category.type === "category" &&
      category.name === "kkpp-notification";
    return value;
  });

  //count no of categories
  let k = 0;
  categories.every((category) => {
    k++;
    return true;
  });

  //to check if kkpp-notification category exists
  if (k > 0) {
    console.log(`${message.author.id} : category kkpp-notification exists`);
    //iterate through districtList
    for (let j = 0; j < data.length; j++) {
      //find collection of channels with the district name data[j].district_name and unde category "kkpp-notification"
      let channels = message.guild.channels.cache.filter((channel) => {
        let value = false;
        if (channel.parent != null) {
          value =
            channel.deleted == false &&
            channel.type === "text" &&
            channel.name === data[j].district_name.toLowerCase() &&
            channel.parent.name === "kkpp-notification";
        }
        return value;
      });

      //delete channels in the category
      channels.every((ch) => {
        ch.delete();
        ch.deleted = true;
        console.log(`${message.author.id} : channel ${ch.name} deleted`);

        return true;
      });
    }
  }

  //reply after process is completed
  console.log(`${message.author.id} : cleanup complete`);
  message.reply({
    embed: embedModels("general", "Cleanup complete", `${dmOrNot(message)}`),
  });
  return;
};
module.exports = cleanup;
