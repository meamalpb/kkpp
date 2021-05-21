const display = require("../../src/channel/displaychnnel");

centers = (today, data, client, district) => {
  console.log("reached");
  let descArr = [];
  let count = 0;
  let desc = "";
  let flag = 0;
  let nextDesc = "";

  desc = `${desc} \n\n **${today}**\n\n`;

  //looping through each center a day
  for (let j = 0; j < data.centers.length; j++) {
    //looping through each session
    for (let k = 0; k < data.centers[j].sessions.length; k++) {
      //search by date
      if (data.centers[j].sessions[k].date === today) {
        const name = data.centers[j].name;
        const block = data.centers[j].block_name;
        const time = data.centers[j].from + " - " + data.centers[j].to;
        const vaccine = data.centers[j].sessions[k].vaccine;
        let age = data.centers[j].sessions[k].min_age_limit;
        const dose1 = data.centers[j].sessions[k].available_capacity_dose1;
        const dose2 = data.centers[j].sessions[k].available_capacity_dose2;
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
  console.log(district);
  district = district.toLowerCase();
  var j = 1;

  display(client, `\n${descArr[0]}`, district, j);

  if (descArr.length > 1) {
    //if there is a splitting
    for (let i = 1; i < descArr.length; i++) {
      console.log(descArr[i]);
      //replying with centers
      j++;
      display(client, `\n${descArr[i]}`, district, j);
    }
  }
};

module.exports = centers;
//embedModels("general", `Continued`, `\n${descArr[i]}`)
