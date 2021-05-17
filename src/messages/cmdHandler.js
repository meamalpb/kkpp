const districts = require("../districts");
const embedModels = require("./embedModels");
const errorText = "Use _help to see commands";
const errorText2 = "Enter only one number";
const checkDMText = "check your DM for further details";
const users = require("../helpers/model");
const axios = require("axios");
cmdHandler = (cmd, args, mssg, client) => {
  if ((cmd === "reg") | (cmd === "edit")) {
    if (!args.length) {
      let desc = "\n";
      for (let i = 0; i < districts.length; i++) {
        desc = `${desc} ${i + 1}. ${districts[i]} \n`;
      }
      let model = embedModels.regModel;
      model.description = `${desc}`;
      client.users.cache.get(mssg.author.id).send({ embed: model });
      model = embedModels.checkDMModel;
      model.description = `<@!${mssg.author.id}> \n\n ${checkDMText}`;
      mssg.reply({ embed: model });
      return;
    }

    let model = embedModels.errorModel;
    model.description = `<@!${mssg.author.id}> \n\n ${errorText}`;
    mssg.reply({ embed: model });
    return;
  }
  if (cmd === "checkdb") {
    axios
      .get("https://cdn-api.co-vin.in/api/v2/admin/location/districts/17", {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
        },
      })
      .then(async (response) => {
        const districtz = response.data.districts;
        for (i = 0; i < districtz.length; i++) {
          if (districtz[i].district_name === "Thrissur") {
            const did = districtz[i].district_id;
            const dname = districtz[i].district_name;
            const uid = mssg.author.id;
            try {
              const user = await users.create({
                username: uid,
                district: dname,
                district_id: did,
              });
              return mssg.reply("added");
            } catch (e) {
              if (e.name === "SequelizeUniqueConstraintError") {
                mssg.reply("That username already exists.");
              }
              console.log("error is" + e.name);
            }
          }
        }
        console.log(districtz[0].district_id);
      })
      .catch((err) => {
        console.log("is" + err);
      });
    return;
  }
  let model = embedModels.errorModel;
  model.description = `<@!${mssg.author.id}> \n\n ${errorText}`;
  mssg.reply({ embed: model });
  return;
};

module.exports = cmdHandler;
