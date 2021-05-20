const embedModels = require("../embedModels");
const dmOrNot = require("./dmOrNot");
const day = require("../../today");

//function to check for centers using district or pin, without age
checkData = (mssg, today, data, limit) => {
  let desc = "\n";

  //loop for 7 days of the week
  for (var i = 0; i < 7; i++) {
    let tempdesc = `\n`;

    //looping through each center a day
    for (var j = 0; j < data.centers.length; j++) {
      for (var k = 0; k < data.centers[j].sessions.length; k++) {
        if (data.centers[j].sessions[k].date === day(today)) {
          if ((data.centers[j].sessions[k].min_age_limit === limit) | !limit) {
            const name = data.centers[j].name;
            const block = data.centers[j].block_name;
            const time = data.centers[j].from + " to " + data.centers[j].to;
            const vaccine = data.centers[j].sessions[k].vaccine;
            const dose1 = data.centers[j].sessions[k].available_capacity_dose1;
            const dose2 = data.centers[j].sessions[k].available_capacity_dose2;
            tempdesc = `${tempdesc}\n${name}\n${block}\ntime:${time}\n${vaccine}\nDose1 Availability:${dose1}\nDose2 Availability:${dose2}\n`;
          }
        }
      }
    }

    //adding center to description
    if (tempdesc != `\n`) {
      desc = `${desc} \n\n ${day(today)} \n${tempdesc}`;
    }

    //get next date
    today.setDate(today.getDate() + 1);
  }

  //if no center is availble this week
  if (desc === "\n") {
    desc = "\n\nNo Vaccinaton centers available";
  }

  //printing centers to console
  console.log(desc);

  //replying with centers
  mssg.reply({
    embed: embedModels(
      "general",
      `Available vaccination centers`,
      `${dmOrNot(mssg)}${desc}`
    ),
  });

  return;
};

module.exports = checkData;
