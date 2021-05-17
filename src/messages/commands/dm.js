chnnel = (mssg) => {
  if (mssg.channel.type !== "dm") {
    return `<@!${mssg.author.id}>`;
  }
  return "";
};
module.exports = chnnel;
