const districts = require("../../data/districts");
const embedModels = require("../formatting/embedModels");
const dmOrNot = require("../formatting/dmOrNot");

//function that displays list of district and age groups and mssg to enter pin
list = (mssg) => {
  let desc = "\n";

  //generating district list
  for (let i = 0; i < districts.length; i++) {
    desc = `${desc} ${i + 1}. ${districts[i]} \n`;
  }

  //send district list
  mssg.reply({
    embed: embedModels("district", "", `${dmOrNot(mssg)}\n${desc}`),
  });
  console.log(`${mssg.author.id} : district list displayed`);
  return;
};

module.exports = list;
