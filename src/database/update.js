const users = require("./model");
const districts = require("../data/districts");
const dmOrNot = require("../messages/formatting/dmOrNot");

const update = {
  //function to update a district
  update_district: async (did, dname, uid, mssg, arg) => {
    try {
      //update query
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
        console.log(`${mssg.author.id} : updated district to ${dname}`);
      }

      //if user not registered
      else {
        mssg.reply({
          embed: embedModels(
            "general",
            `User not Registered`,
            `${dmOrNot(mssg)} \n\n use command : _register`
          ),
        });
        console.log(`${mssg.author.id} : user not registered`);
      }
    } catch (e) {
      //if error
      console.log(`${mssg.author.id} : ${e}`);
      mssg.reply({
        embed: embedModels(
          "general",
          `Server Error`,
          `${dmOrNot(mssg)} \n\n Unable to update district`
        ),
      });
    }

    //return a promise
    return new Promise((resolve) => {
      resolve();
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
      }

      //if data not updated
      else {
        mssg.reply({
          embed: embedModels(
            "general",
            `User not Registered `,
            `${dmOrNot(mssg)} \n\n use command : _register`
          ),
        });
      }
    } catch (e) {
      //if  error
      mssg.reply({
        embed: embedModels(
          "general",
          `Server Error`,
          `${dmOrNot(mssg)} \n\n Unable to update pincode`
        ),
      });
    }
    return new Promise((resolve) => {
      resolve();
    });
  },
};

module.exports = update;
