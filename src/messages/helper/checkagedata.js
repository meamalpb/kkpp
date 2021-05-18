const embedModels = require("../embedModels");
const dmOrNot = require("../helper/dmOrNot");
const day = require("../../today");
checkagedata = (mssg, today, data, limit) => {
  let desc = "\n";
  for (var i = 0; i < 7; i++) {
    let tempdesc = `\n`;
    for (var j = 0; j < data.centers.length; j++) {
      for (var k = 0; k < data.centers[j].sessions.length; k++) {
        if (
          data.centers[j].sessions[k].date === day(today) &&
          data.centers[j].sessions[k].min_age_limit == limit
        ) {
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
    if (tempdesc === `\n`) {
      tempdesc = `${tempdesc}  No Vaccination centres available on this day\n`;
    }
    desc = `${desc} \n\n ${day(today)} \n${tempdesc}`;
    today.setDate(today.getDate() + 1);
  }
  mssg.reply({
    embed: embedModels("check", ``, `${dmOrNot(mssg)}${desc}`),
  });
};
module.exports = checkagedata;
