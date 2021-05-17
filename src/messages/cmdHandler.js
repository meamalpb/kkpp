const axios = require("axios");

const districts = require("../districts");
const embedModels = require("./embedModels");
const errorText = "Use _help to see commands";
const checkDMText = "check your DM for further details";
const users = require("../database/model");

cmdHandler = (cmd, args, mssg, client) => {
  //if command is reg or edit
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

  //for selecting districts
  else if (cmd === "district") {
    if ((args.length > 1) | (args.length < 1)) return;
    if ((parseInt(args[0]) > 0) & (parseInt(args[0]) < 15)) {
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
            if (data[i].district_name === districts[args - 1]) {
              const did = data[i].district_id;
              const dname = data[i].district_name;
              const uid = mssg.author.id;
              try {
                const user = await users.create({
                  username: uid,
                  district: dname,
                  district_id: did,
                });
                let model = embedModels.emptyModel;
                model.title = `${districts[args - 1]} selected`;
                mssg.reply({ embed: model });
                return;
              } catch (e) {
                if (e.name === "SequelizeUniqueConstraintError") {
                  mssg.reply("That username already exists.");
                }
                console.log("error is" + e.name);
              }
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      //when args are not in between 1-14
      let model = embedModels.districtErrorModel;
      mssg.reply({ embed: model });
      return;
    }
  } else {
    let model = embedModels.errorModel;
    model.description = `<@!${mssg.author.id}> \n\n ${errorText}`;
    mssg.reply({ embed: model });
    return;
  }
};

module.exports = cmdHandler;
