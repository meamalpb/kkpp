const axios = require("axios");
const districts = require("../../districts");
const users = require("../../database/model");
const embedModels = require("../embedModels");

cmdDistrict = (args, mssg) => {
  //fetching district list
  axios
    .get("https://cdn-api.co-vin.in/api/v2/admin/location/districts/17", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
      },
    })
    .then(async (res) => {
      const data = res.data.districts;
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
                `Added district : ${districts[args + 1]}`,
                `<@!${mssg.author.id}>`
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
                    `Updated district : ${districts[args + 1]}`,
                    `<@!${mssg.author.id}>`
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
    })
    .catch((e) => {
      console.log(e);
      return;
    });
};

module.exports = cmdDistrict;
