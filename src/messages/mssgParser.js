mssgParser = (mssg) => {
  const prefix = "_";

  if (mssg.content.startsWith(prefix)) {
    mssg = mssg.content.trim().slice(prefix.length).trim();
    arr = mssg.split(/\s+/);
    cmd = arr.shift();
    return [cmd, arr];
  } else {
    return [undefined, undefined];
  }
};

module.exports = mssgParser;
