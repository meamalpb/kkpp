const fetchApi = require("../helper/fetchApi");
const districts = require("../../districts");
const users = require("../../database/model");
const embedModels = require("../embedModels");
const age = ["18-45", "Above 45"];
const dmOrNot = require("../helper/dmOrNot");

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
              `Added district : ${districts[arg - 1]}`,
              `${dmOrNot(mssg)}`
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
                  `Updated district : ${districts[arg - 1]}`,
                  `${dmOrNot(mssg)}`
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
    const agegroup = age[arg - 1];
    try {
      //insert user into db along with district_id
      await users.create({
        username: uid,
        age_group: agegroup,
      });
      mssg.reply({
        embed: embedModels(
          "general",
          `Added age group : ${age[arg - 1]}`,
          `${dmOrNot(mssg)}`
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
              `Updated age group : ${age[arg - 1]}`,
              `${dmOrNot(mssg)}`
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
        pin: arg,
      });
      mssg.reply({
        embed: embedModels("general", `Added pin : ${arg}`, `${chnnel(mssg)}`),
      });
      return;
    } catch (e) {
      //if user has already selected a district
      if (e.name === "SequelizeUniqueConstraintError") {
        const rows = await users.update(
          { pin: arg },
          { where: { username: uid } }
        );
        // if data updated
        if (rows > 0) {
          mssg.reply({
            embed: embedModels(
              "general",
              `Updated pin: ${arg}`,
              `${dmOrNot(mssg)}`
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

module.exports = filters;
