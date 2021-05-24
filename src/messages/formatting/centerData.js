const embedModels = require("./embedModels");
const dmOrNot = require("./dmOrNot");
const formatDate = require("./today");

//function to check for centers using district or pin, without age
centerData = (mssg, today, data, limit) => {
  //embed messsage can only have a max of 2048 characters. Array to split message.
  let descArr = [];
  let count = 0;
  let desc = "";
  let flag = 0;
  let nextDesc = "";

  //loop for 7 days of the week
  for (let i = 0; i < 7; i++) {
    desc = `${desc} \n\n **${formatDate(today)}**\n\n`;

    //looping through each center a day
    for (let j = 0; j < data.centers.length; j++) {
      //looping through each session
      for (let k = 0; k < data.centers[j].sessions.length; k++) {
        //search by date
        if (data.centers[j].sessions[k].date === formatDate(today)) {
          //using age if age is used as filter, else ignored
          if (
            (data.centers[j].sessions[k].min_age_limit === limit) |
            (limit < 0)
          ) {
            if (
              (data.centers[j].sessions[k].available_capacity_dose1 !== 0) |
              (data.centers[j].sessions[k].available_capacity_dose2 !== 0)
            ) {
              const name = data.centers[j].name;
              const block = data.centers[j].block_name;
              const time = data.centers[j].from + " - " + data.centers[j].to;
              const vaccine = data.centers[j].sessions[k].vaccine;
              let age = data.centers[j].sessions[k].min_age_limit;
              const dose1 =
                data.centers[j].sessions[k].available_capacity_dose1;
              const dose2 =
                data.centers[j].sessions[k].available_capacity_dose2;
              nextDesc = `\n${name.toUpperCase()}\n${block}\n${vaccine}\nAge : ${age}+\nTime : ${time}\nDose-1 : ${dose1}\nDose-2 : ${dose2}\n`;
              count += nextDesc.length;
              flag = 1;

              //if nextDesc can be included
              if (count <= 1800) {
                desc = `${desc}${nextDesc}`;
              }

              //if nextDesc cannot be included
              else {
                descArr.push(desc);
                desc = nextDesc;
                count = nextDesc.length;
              }
            }
          }
        }
      }
    }

    //get next date
    today.setDate(today.getDate() + 1);
  }

  //if no center is availble this week
  if (!flag) {
    descArr.push("\nNo Vaccinaton centers available");
  }

  //if center is available
  else {
    if (count > 0) descArr.push(desc);
  }

  console.log(descArr[0]);
  //replying with centers
  mssg.reply({
    embed: embedModels(
      "general",
      `Available vaccination centers`,
      `${dmOrNot(mssg)}\n${descArr[0]}`
    ),
  });

  if (descArr.length > 1) {
    //if there is a splitting
    for (let i = 1; i < descArr.length; i++) {
      console.log(descArr[i]);
      //replying with centers
      mssg.reply({
        embed: embedModels(
          "general",
          `Continued`,
          `${dmOrNot(mssg)}\n${descArr[i]}`
        ),
      });
    }
  }

  return;
};

module.exports = centerData;
