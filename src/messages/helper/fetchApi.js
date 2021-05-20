const axios = require("axios");
const embedModels = require("../embedModels");

getInfo = async (api, mssg) => {
  try {
    let result = await axios.get(api, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
      },
    });
    result = result.data;

    //returning a promise
    return new Promise((resolve) => {
      resolve(result);
    });
  } catch (e) {
    //error printed
    console.log(`${mssg.author.id} : ${e}`);
    return new Promise((resolve) => {
      resolve(false);
    });
  }
};

module.exports = getInfo;
