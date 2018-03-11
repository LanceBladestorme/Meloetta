exports.run = async (client, msg) => {
  const ms = require('ms');
  const args = msg.content.split(" ");
  if (!client.lockit) client.lockit = [];
    let time = args[1];
    let validUnlocks = ['release', 'unlock'];
    if (!time) return msg.reply('I need to know a set amount of hours, minutes or seconds to lock the channel down!');

    if (validUnlocks.includes(time)) {
      msg.channel.overwritePermissions(msg.guild.id, {
        SEND_MESSAGES: null
      }).then(() => {
        msg.channel.send('Lockdown lifted.');
        clearTimeout(client.lockit[msg.channel.id]);
        delete client.lockit[msg.channel.id];
      }).catch(error => {
        console.log(error);
      });
    } else {
      msg.channel.overwritePermissions(msg.guild.id, {
        SEND_MESSAGES: false
      }).then(() => {
        msg.channel.send(`Channel locked down for ${ms(ms(time), { long:true })}`).then(() => {

          client.lockit[msg.channel.id] = setTimeout(() => {
            msg.channel.overwritePermissions(msg.guild.id, {
              SEND_MESSAGES: null
            }).then(msg.channel.send('Lockdown lifted.')).catch(console.error);
            delete client.lockit[msg.channel.id];
          }, ms(time));

        }).catch(error => {
          console.log(error);
        });
      });
    }
  };
exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text"],
  aliases: ["lock"],
  permLevel: 4,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [""],
};

exports.help = {
  name: "lockdown",
  description: "Prevents anyone except Admins from speaking in specified. To use, type !lockdown <Number>s/m/h (s being seconds and so forth). To stop a lockdown use !lockdown unlock.",
  usage: "",
  usageDelim: "",
  type: "commands",
};
