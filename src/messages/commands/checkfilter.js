const fetchApi = require("../helper/fetchApi");
const day = require("../../today");
const checkdata = require("../helper/checkdata");
const checkagedata = require("../helper/checkagedata");
checkfilter = async (mssg, cmd, id, age) => {
  const today = new Date();
  const date = day(today);
  if (cmd === "checkd" || cmd === "checkda") {
    const data = await fetchApi(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${id}&date=${date}`
    );
    if (cmd === "checkd") {
      checkdata(mssg, today, data);
    } else {
      let limit = 18;
      if (age === "Above 45") {
        limit = 45;
      }
      checkagedata(mssg, today, data, limit);
    }
  } else if (cmd === "checkp" || cmd === "checkpa") {
    const data = await fetchApi(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${id}&date=${date}`
    );

    if (cmd === "checkp") {
      checkdata(mssg, today, data);
    } else {
      let limit = 18;
      if (age === "Above 45") {
        limit = 45;
      }
      checkagedata(mssg, today, data, limit);
    }
  }
};
module.exports = checkfilter;
