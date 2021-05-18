const users = require("./model");
const districts = require("../districts");
const dmOrNot = require("../messages/helper/dmOrNot");

const update = {
  //function to update a district
  update_district: async (did, dname, uid, mssg, arg) => {
    let data = "";
    try {
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
        data = true;
      }

      //if data not updated
      else {
        mssg.reply({
          embed: embedModels(
            "general",
            `User not Registerd`,
            `${dmOrNot(mssg)} \n\n use command : _register`
          ),
        });
        data = new Error("No rows found");
      }
    } catch (e) {
      data = e;
    }
    return new Promise((resolve) => {
      resolve(data);
    });
  },

  //function to update age group
  update_group: async (uid, agegroup, mssg) => {
    try {
      const rows = await users.update(
        { age_group: agegroup },
        { where: { username: uid } }
      );

      // if data updated
      if (rows > 0) {
        mssg.reply({
          embed: embedModels(
            "general",
            `Updated age group : ${agegroup}`,
            `${dmOrNot(mssg)}`
          ),
        });
        data = true;
      }

      //if data not updated
      else {
        mssg.reply({
          embed: embedModels(
            "general",
            `User not Registerd`,
            `${dmOrNot(mssg)} \n\n use command : _register`
          ),
        });
        data = new Error("No rows found");
      }
    } catch (e) {
      data = e;
    }
    return new Promise((resolve) => {
      resolve(data);
    });
  },

  //function to update pin
  update_pin: async (uid, mssg, arg) => {
    try {
      const rows = await users.update(
        { pin: arg },
        { where: { username: uid } }
      );

      // if data updated
      if (rows > 0) {
        mssg.reply({
          embed: embedModels(
            "general",
            `Updated pin : ${arg}`,
            `${dmOrNot(mssg)}`
          ),
        });
        data = true;
      }

      //if data not updated
      else {
        mssg.reply({
          embed: embedModels(
            "general",
            `User not Registerd `,
            `${dmOrNot(mssg)} \n\n use command : _register`
          ),
        });
        data = new Error("No rows found");
      }
    } catch (e) {
      data = e;
    }
    return new Promise((resolve) => {
      resolve(data);
    });
  },
};

module.exports = update;
