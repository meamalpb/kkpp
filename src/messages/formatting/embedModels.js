embedModels = (type, title, desc) => {
  //district list message model
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

  //help message model
  else if (type === "help") {
    return {
      title: "KKPP Commands",
      description: `${desc}
      __**ADMIN ONLY (CAN'T DM)**__
      \n\n**_setup**
      Set up for automatic updates
      Set up required channels & permissions 

      \n**_cleanup**
      Delete all channels created by _setup

      \n**_sync**
      Refreshes / begins automatic updates

      \n**_desync**
      Stops automatic updates
      
      
      __**@EVERYONE**__
      
      \n**_register**
      Register to database
      
      \n**_district**
      Displays list of districts
      
      \n**_district [district number]**
      Takes 1 argument which is a number 1-14
      Updates your district
      Get district_number from district list.
      Ex : _district 7
      
      \n**_pin [pin code]**
      Takes 1 argument which is 6 digit number
      Updates your pin code
      Ex : _pin 605012
      
      \n**_check ['d' / 'p']**
      Display available centers without using age
      'd' displays centers using your selected district
      'p' displays centers using your selected pincode 
      Ex : _check d
      
      \n**check ['d' / 'p'] [age]**
      Display available centers using age as filter
      'd' displays centers using your selected district
      'p' displays centers using your selected pincode
      Ex : _check p 35`,
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
