const embedModels = require("../embedModels");
const dmOrNot = require("./dmOrNot");
const day = require("../../today");
checkdata = (mssg, today, data) => {
  try {
    let desc = "\n";
    for (var i = 0; i < 7; i++) {
      let tempdesc = `\n`;
      for (var j = 0; j < data.centers.length; j++) {
        for (var k = 0; k < data.centers[j].sessions.length; k++) {
          if (data.centers[j].sessions[k].date === day(today)) {
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
      if (tempdesc != `\n`) {
        desc = `${desc} \n\n ${day(today)} \n${tempdesc}`;
      }
      today.setDate(today.getDate() + 1);
    }
    if (desc === "\n") {
      desc = "No Vaccinaton centres available";
    }
    mssg.reply({
      embed: embedModels("check", ``, `${dmOrNot(mssg)}${desc}`),
    });
    console.log(desc);
  } catch (err) {
    console.log("found an error" + err);
  }
};

module.exports = checkdata;
