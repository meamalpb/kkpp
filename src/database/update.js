const users = require("./model");
const districts = require("../data/districts");
const dmOrNot = require("../messages/formatting/dmOrNot");

const update = {
  //function to update a district
  update_district: async (did, dname, uid, mssg, arg) => {
    try {
      let rows = await users.findOne({
        where: { username: mssg.author.id },
      });

      // if data updated
      if (rows) {
        let existingDistrict = rows.get("district");

        //if there is an existing district
        if (existingDistrict) {
          //find channels having existing districtname
          let channels = mssg.guild.channels.cache.filter((channel) => {
            let value = false;
            if (channel.parent != null) {
              value =
                channel.deleted == false &&
                channel.type === "text" &&
                channel.name === existingDistrict.toLowerCase() &&
                channel.parent.name === "kkpp-notification";
            }
            return value;
          });

          //remove permissions of existing channel
          if (channels) {
            let channel = channels.first();
            channel.updateOverwrite(mssg.author.id, {
              VIEW_CHANNEL: false,
            });
          }
        }

        //update query
        rows = await users.update(
          { district: dname, district_id: did },
          { where: { username: uid } }
        );

        mssg.reply({
          embed: embedModels(
            "general",
            `Updated district : ${districts[arg - 1]}`,
            `${dmOrNot(mssg)}`
          ),
        });

        //find channels having new district name
        channels = mssg.guild.channels.cache.filter((channel) => {
          let value = false;
          if (channel.parent != null) {
            value =
              channel.deleted == false &&
              channel.type === "text" &&
              channel.name === dname.toLowerCase() &&
              channel.parent.name === "kkpp-notification";
          }
          return value;
        });

        //add permissions for updated district
        if (channels) {
          channel = channels.first();
          channel.updateOverwrite(mssg.author.id, {
            VIEW_CHANNEL: true,
          });
        }
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
