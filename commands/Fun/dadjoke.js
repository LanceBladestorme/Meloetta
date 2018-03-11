const request = require("snekfetch");

exports.run = async (client, msg) => {
  const res = await request.get("https://icanhazdadjoke.com/slack").then(data => JSON.parse(data.text));
  return msg.channel.send(`📢 **Dad joke:** *${res.attachments[0].text}*`);
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: ["yomama"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: ["snekfetch"],
};

exports.help = {
  name: "dadjoke",
  description: "Dad Jokes. Do I need to say more?",
  usage: "",
  usageDelim: "",
  type: "commands",
};
