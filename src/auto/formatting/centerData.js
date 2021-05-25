const display = require("../../channel/displayChannel");
const formatDate = require("../../messages/formatting/today");

centerData = async (data, client) => {
  let descArr = [];
  let today = new Date();
  let count = 0;
  let desc = "";
  let flag = 0;
  let nextDesc = "";

  let sortedCenters = [...data.centers];

  //sort centers by name
  sortedCenters.sort((a, b) => {
    if (a.name > b.name) return 1;
    else if (b.name > a.name) return -1;
    return 0;
  });

  //loop for 7 days of the week
  for (let i = 0; i < 7; i++) {
    desc = `${desc} \n\n:loudspeaker: **${formatDate(today)}**\n\n`;

    //looping through each center a day
    for (let j = 0; j < sortedCenters.length; j++) {
      //looping through each session
      for (let k = 0; k < sortedCenters[j].sessions.length; k++) {
        //search by date
        if (sortedCenters[j].sessions[k].date === formatDate(today)) {
          const name = sortedCenters[j].name;
          const block = sortedCenters[j].block_name;
          const time = sortedCenters[j].from + " - " + sortedCenters[j].to;
          const vaccine = sortedCenters[j].sessions[k].vaccine;
          let age = sortedCenters[j].sessions[k].min_age_limit;
          const dose1 = sortedCenters[j].sessions[k].available_capacity_dose1;
          const dose2 = sortedCenters[j].sessions[k].available_capacity_dose2;
          nextDesc = `\n${name.toUpperCase()}\n${block}\n${vaccine}\nAge : ${age}+\nTime : ${time}\nDose-1 : ${dose1}\nDose-2 : ${dose2}\n`;
          count += nextDesc.length;
          flag = 1;

          //if nextDesc can be included
          if (count <= 1700) {
            desc = `${desc}${nextDesc}`;
          }

          //if nextDesc cannot be included
          else {
            desc = `${desc} \n\n[Kittiyal Kitti](https://www.cowin.gov.in/home) :syringe:`;
            descArr.push(desc);
            desc = nextDesc;
            count = nextDesc.length;
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
    if (count > 0) {
      desc = `${desc} \n\n[Kittiyal Kitti](https://www.cowin.gov.in/home) :syringe:`;
      descArr.push(desc);
    }
  }
  //print description to corresponding channel
  display(client, descArr, data.district.toLowerCase());
};

module.exports = centerData;
