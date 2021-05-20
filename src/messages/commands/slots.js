const fetch = require("../../api/fetch");
const day = require("../formatting/today");
const centerData = require("../formatting/centerData");

//function for check commands
slots = async (mssg, cmd, id, age) => {
  //get today's date
  const today = new Date();
  const date = day(today);
  let data = "";

  //if check is district based
  if (cmd === "checkd" || cmd === "checkda") {
    data = await fetch(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${id}&date=${date}`,
      mssg
    );
  }

  //if check is pincode based
  if (cmd === "checkp" || cmd === "checkpa") {
    data = await fetch(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${id}&date=${date}`,
      mssg
    );
  }

  //if error
  if (!data) {
    let filter = "";
    if ((cmd === "checkd") | (cmd === "checkda")) filter = "district";
    if ((cmd === "checkp") | (cmd === "checkpa")) filter = "pincode";

    //replying with error
    mssg.reply({
      embed: embedModels(
        "general",
        "Server Error",
        `${dmOrNot(mssg)} \n\nUnable to fetch from API. Try updating ${filter} `
      ),
    });

    return;
  }
  //data is fetched
  console.log(`${mssg.author.id} : fetched available centers from API`);

  //if age is not needed
  if ((cmd === "checkd") | (cmd === "checkp")) {
    centerData(mssg, today, data, 0);
    return;
  }

  //if age is needed
  let limit = 18;
  if (age === "Above 45") limit = 45;
  if ((age === "18-45") | (age === "Above 45"))
    centerData(mssg, today, data, limit);
  else
    mssg.reply({
      embed: embedModels(
        "general",
        "Update Age group",
        `${dmOrNot(mssg)} \n\nUse command : _group 1 | _group 2`
      ),
    });
  return;
};
module.exports = slots;
