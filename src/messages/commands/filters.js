const fetch = require("../../api/fetch");
const districts = require("../../data/districts");
const age = ["18-45", "Above 45"];
const update = require("../../database/update");
const makeChannel = require("../../channel/makeChannel");

//function to handle commands dealing with filters like district, pin and age group
filters = async (cmd, arg, mssg, client) => {
  if (cmd === "district") {
    //fetching district list
    let data = await fetch(
      "https://cdn-api.co-vin.in/api/v2/admin/location/districts/17",
      mssg
    );

    //if error
    if (!data) {
      //replying with error
      mssg.reply({
        embed: embedModels(
          "general",
          "Server Error",
          `${dmOrNot(mssg)} \n\nUnable to fetch from API `
        ),
      });

      return;
    }
    console.log(`${mssg.author.id} : fetched districts list from API`);
    data = data.districts;
    for (var j = 0; j < data.length; j++) {
      var channels = mssg.guild.channels.cache.filter((channel) => {
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
        //makeChannel(client, mssg, data[j].district_name);
      }
    }
    makeChannel(client, mssg, "hello");
    for (i = 0; i < data.length; i++) {
      //find selected district
      if (data[i].district_name === districts[arg - 1]) {
        const did = data[i].district_id;
        const dname = data[i].district_name;
        const uid = mssg.author.id;

        //update database
        await update.update_district(did, dname, uid, mssg, arg);
        return;
      }
    }
  }

  if (cmd === "pin") {
    const uid = mssg.author.id;

    //update database
    await update.update_pin(uid, mssg, arg);
    return;
  }

  return;
};

module.exports = filters;
