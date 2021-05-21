const fetch = require("../../api/fetch");
const day = require("../formatting/today");
const centerData = require("../formatting/centerData");

//function for check commands
slots = async (mssg, arg, id, age) => {
  //get today's date
  const today = new Date();
  const date = day(today);
  let data = "";

  if ((age < 18) & (age >= 0)) {
    console.log(
      `${mssg.author.id} : Vaccination for this age group hasnt started`
    );
    //replying with error
    mssg.reply({
      embed: embedModels(
        "general",
        "Vaccination not available",
        `${dmOrNot(mssg)} \n\nVaccination for this age group hasnt started`
      ),
    });

    return;
  }

  //if check is district based
  if (arg === "d") {
    data = await fetch(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${id}&date=${date}`,
      mssg
    );
  }

  //if check is pincode based
  if (arg === "p") {
    data = await fetch(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${id}&date=${date}`,
      mssg
    );
  }

  //if error
  if (!data) {
    let filter = "";
    if (arg === "d") filter = "district";
    if (arg === "p") filter = "pincode";

    console.log(
      `${mssg.author.id} : unable to fetch from API. Try updating ${filter}`
    );
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
  if (age < 0) {
    centerData(mssg, today, data, age);
    return;
  }

  //if age is needed
  if (age < 0) limit = -1;
  else if ((age >= 18) & (age < 45)) limit = 18;
  else if (age >= 45) limit = 45;

  console.log(limit);

  centerData(mssg, today, data, limit);
};
module.exports = slots;
