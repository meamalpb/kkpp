const fetchApi = require("../helper/fetchApi");
const districts = require("../../districts");
const users = require("../../database/model");
const embedModels = require("../embedModels");
const age = ["18-45", "Above 45"];
const dmOrNot = require("../helper/dmOrNot");
const insert = require("../../database/insert");
const update = require("../../database/update");

filters = async (cmd, arg, mssg) => {
  if (cmd === "district") {
    //fetching district list
    let data = await fetchApi(
      "https://cdn-api.co-vin.in/api/v2/admin/location/districts/17"
    );
    data = data.districts;
    for (i = 0; i < data.length; i++) {
      //find selected district
      if (data[i].district_name === districts[arg - 1]) {
        const did = data[i].district_id;
        const dname = data[i].district_name;
        const uid = mssg.author.id;

        let res = await update.update_district(did, dname, uid, mssg, arg);
        console.log(res);
        if (res instanceof Error) console.log(res.name);
        return;
      }
    }
  }

  //else if group is selected
  if (cmd === "group") {
    const uid = mssg.author.id;
    const agegroup = age[arg - 1];

    let res = await update.update_group(uid, agegroup, mssg);
    if (res instanceof Error) console.log(res.name);
    return;
  }

  if (cmd === "pin") {
    const uid = mssg.author.id;

    let res = await update.update_pin(uid, arg, mssg);
    if (res instanceof Error) console.log(res.name);
    return;
  }
  console.log(e);
  return;
};

module.exports = filters;
