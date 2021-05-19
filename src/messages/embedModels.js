embedModels = (type, title, desc) => {
  try {
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

    //pine menu message model
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
    } else if (type === "check") {
      return {
        title: "Available vaccination centres for the next week",
        description: `${desc}`,
      };
    }
    //general message model
    else if (type === "general") {
      return {
        title: title,
        description: desc,
      };
    }
  } catch (err) {
    console.log("error found" + err);
  }
};

module.exports = embedModels;
