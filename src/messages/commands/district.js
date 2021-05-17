const fetchdata = require("./fetchapi");
const districts = require("../../districts");
const users = require("../../database/model");
const embedModels = require("../embedModels");
const age = ["18-45", "Above 45"];
const chnnel = require("./dm");
cmdDistrict = async (cmd, args, mssg) => {
  if (cmd === "district") {
    //fetching district list
    const apidata = await fetchdata(
      "https://cdn-api.co-vin.in/api/v2/admin/location/districts/17"
    );
    data = apidata.districts;
    console.log(data);
    for (i = 0; i < data.length; i++) {
      //find selected district
      if (data[i].district_name === districts[args - 1]) {
        const did = data[i].district_id;
        const dname = data[i].district_name;
        const uid = mssg.author.id;
        try {
          //insert user into db along with district_id
          await users.create({
            username: uid,
            district: dname,
            district_id: did,
          });
          mssg.reply({
            embed: embedModels(
              "general",
              `Added district : ${districts[args - 1]}`,
              `${chnnel(mssg)}`
            ),
          });
          return;
        } catch (e) {
          //if user has already selected a district
          if (e.name === "SequelizeUniqueConstraintError") {
            const rows = await users.update(
              { district: dname, district_id: did },
              { where: { username: uid } }
            );
            // if data updated
            if (rows > 0) {
              mssg.reply({
                embed: embedModels(
                  "general",
                  `Updated district : ${districts[args - 1]}`,
                  `${chnnel(mssg)}`
                ),
              });
              return;
            }

            return;
          }
          console.log(e);
          return;
        }
      }
    }
  } else if (cmd === "group") {
    const uid = mssg.author.id;
    const agegroup = age[args - 1];
    try {
      //insert user into db along with district_id
      await users.create({
        username: uid,
        age_group: agegroup,
      });
      mssg.reply({
        embed: embedModels(
          "general",
          `Added age group : ${age[args - 1]}`,
          `${chnnel(mssg)}`
        ),
      });
      return;
    } catch (e) {
      //if user has already selected a district
      if (e.name === "SequelizeUniqueConstraintError") {
        const rows = await users.update(
          { age_group: agegroup },
          { where: { username: uid } }
        );
        // if data updated
        if (rows > 0) {
          mssg.reply({
            embed: embedModels(
              "general",
              `Updated age group : ${age[args - 1]}`,
              `${chnnel(mssg)}`
            ),
          });
          return;
        }

        return;
      }
      console.log(e);
      return;
    }
  } else if (cmd === "pin") {
    const uid = mssg.author.id;
    try {
      //insert user into db along with district_id
      await users.create({
        username: uid,
        pin: args,
      });
      mssg.reply({
        embed: embedModels("general", `Added pin : ${args}`, `${chnnel(mssg)}`),
      });
      return;
    } catch (e) {
      //if user has already selected a district
      if (e.name === "SequelizeUniqueConstraintError") {
        const rows = await users.update(
          { pin: args },
          { where: { username: uid } }
        );
        // if data updated
        if (rows > 0) {
          mssg.reply({
            embed: embedModels(
              "general",
              `Updated pin: ${args}`,
              `${chnnel(mssg)}`
            ),
          });
          return;
        }

        return;
      }
      console.log(e);
      return;
    }
  }
};

module.exports = cmdDistrict;
