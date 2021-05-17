const districts     =   require("../districts");
const embedModels   =   require("./embedModels");
const errorText     =   "Use _help to see commands";
const checkDMText   =   "check your DM for further details";

cmdHandler = (cmd, args, mssg, client) => {

  //if command is reg
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
    //if args are given
    let model = embedModels.errorModel;
    model.description = `<@!${mssg.author.id}> \n\n ${errorText}`;
    mssg.reply({ embed: model });
    return;
  }

  //for selecting districts
  if (cmd === "dist") {
    if (parseInt(args)>0 & parseInt(args)<15) {
      let model = embedModels.distModel;
      model.title = `${districts[args-1]} selected`;
      mssg.reply({ embed: model });
      return;
    }
    //when args are not in between 1-14
    let model = embedModels.DisterrorModel;
    mssg.reply({ embed: model });
    return;
  }


  let model = embedModels.errorModel;
  model.description = `<@!${mssg.author.id}> \n\n ${errorText}`;
  mssg.reply({ embed: model });
  return;
};

module.exports = cmdHandler;
