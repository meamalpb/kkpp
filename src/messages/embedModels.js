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

  emptyModel: {},

  checkDMModel: {
    title: "Pinged you",
  },

  errorModel: {
    title: "Invalid command",
  },

  districtErrorModel: {
    title: "Invalid arguments",
  },
};

module.exports = embedModels;
