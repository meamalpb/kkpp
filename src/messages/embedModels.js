embedModels = (type, title, desc) => {
  //district menu message model
  if (type === "district") {
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

  //age_group menu message model
  else if (type === "age") {
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

  //pincode menu message model
  else if (type === "pin") {
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
