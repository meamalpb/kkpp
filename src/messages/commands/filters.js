const fetch = require("../../api/fetch");
const districts = require("../../data/districts");
const update = require("../../database/update");

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
