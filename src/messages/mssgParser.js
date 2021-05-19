mssgParser = (mssg) => {
  const prefix = "_";

  if (mssg.content.startsWith(prefix)) {
    arr = mssg.content.trim().slice(prefix.length).trim();
    arr = arr.split(/\s+/);
    cmd = arr.shift();
    console.log(
      `${mssg.author.id} : command used - ${cmd} , args provided - ${arr}`
    );
    return [cmd, arr];
  } else {
    return [undefined, undefined];
  }
};

module.exports = mssgParser;
