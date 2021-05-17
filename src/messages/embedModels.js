embedModels = (type, title, desc) => {
  //reg or edit message model
  if (type === "reg") {
    return {
      title: "District List",
      description: `${desc}`,
      fields: [
        {
          name: "command",
          value: "_district 1 | _district 2 | _district 3 ...",
        },
      ],
    };
  }

  //general message model
  else if (type === "general") {
    return {
      title: title,
      description: desc,
    };
  }
};

module.exports = embedModels;
