exports.run = async (client, msg, guild) => {
let args = msg.content.split(" ");
let user = msg.mentions.users.first();
let name = args.slice(2).join(' ');
try {
  await msg.guild.member(user).setNickname(name);
  if (name < 1)
  return msg.channel.send('**Please enter in a nickname!**')
  msg.channel.send(`**Target's name has been changed to: ${name}!**`);
} catch (err) {
  msg.channel.send("There was an error changing the targets name. Please be aware I can not reject higher ranking members than me.")
}};

  exports.conf = {
    enabled: true,
    selfbot: false,
    runIn: ["text"],
    aliases: ["nn", "nick"],
    permLevel: 2,
    botPerms: ["MANAGE_NICKNAMES"],
    requiredFuncs: [],
    requiredModules: [],
  };

  exports.help = {
    name: "nickname",
    description: "Changes mentioned user's nickname",
    usage: "",
    usageDelim: "",
    type: "commands",
  };
