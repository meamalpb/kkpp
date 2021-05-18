var today = (date) => {
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = date.getFullYear();
  formday = dd + "-" + mm + "-" + yyyy;
  return formday;
};

module.exports = today;
