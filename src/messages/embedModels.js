const embedModels = {
  regModel: {
    title: "District List",
    fields: [
      {
        name: "command",
        value: "_district 1 | _district 2 | _district 3 ...",
      },
    ],
  },

  checkDMModel: {
    title: "Pinged you",
  },
  errorModel: {
    title: "Invalid command",
  },
  DisterrorModel : {
    title : "Invalid district No."

  },
  distModel : {
  
  }
};

module.exports = embedModels;
