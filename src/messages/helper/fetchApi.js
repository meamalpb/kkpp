const axios = require("axios");
/*getInfo = async (api) => {
  axios
    .get(api, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
      },
    })
    .then(async (response) => {
      const result = await response.data.districts;
      console.log(result);
      return Promise((resolve, reject) => {
        if (result) resolve(result);
      });
    })
    .catch((err) => {
      console.log("is" + err);
    });
};*/
getInfo = async (api) => {
  const result = await axios.get(api, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
    },
  });
  const result1 = result.data;
  return new Promise((resolve, reject) => {
    if (result1) resolve(result1);
  });
};

module.exports = getInfo;
