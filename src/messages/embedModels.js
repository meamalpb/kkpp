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
  //reg or edit age group message model
  else if (type === "regage") {
    return {
      title: "Age Groups",
      description: `${desc}`,
      fields: [
        {
          name: "command",
          value: "_group 1 | _group 2 ...",
        },
      ],
    };
  }
  //reg or edit pin message model
  else if (type === "regpin") {
    return {
      title: "PIN",
      description: `${desc}`,
      fields: [
        {
          name: "command",
          value: "_pin 000001 | _pin 020001 | _pin 603451 .......",
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
