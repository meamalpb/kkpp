const axios = require("axios");

getInfo = async (api) => {
  let result = await axios.get(api, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
    },
  });
  result = result.data;
  return new Promise((resolve, reject) => {
    if (result) resolve(result);
  });
};

module.exports = getInfo;
