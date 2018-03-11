
exports.run = async (client, msg) => {
  const request = require("snekfetch");
  const oakdexPokedex = require('oakdex-pokedex');
  var Pokedex = require('pokedex-promise-v2');
  var dex = new Pokedex();
  const args = msg.content.split(" ");

  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

oakdexPokedex.findPokemon(`${capitalizeFirstLetter(args[1])}`, function(p) {

dex.getPokemonByName(args[1].toLowerCase(), function(response, error) {

if (error) {
  var ability2 = "N/A"
} else {
  try{
  var ability2 =  response.abilities[1].ability.name
}catch(e){
  var ability2 = "N/A"
}
}

var thumbnail = (p.names.en).toLowerCase()

try{
  var hidden = p.abilities[1].name
}catch(e){
   var hidden = "N/A"
}

try{
  var description1 = p.pokedex_entries.Sun.en
  var game1 = "Sun"
}catch(e){
   var description1 = p.pokedex_entries["Omega Ruby"].en
   var game1 = "OR"
}

try{
  var description2 = p.pokedex_entries.Moon.en
  var game2 = "Moon"
}catch(e){
   var description2 = p.pokedex_entries["Alpha Sapphire"].en
   var game2 = "AS"
}

msg.channel.send({embed: {
    color: 0xff0000,
    author: {
      name: "Pokedex",
      icon_url: "https://pro-rankedboost.netdna-ssl.com/wp-content/uploads/2017/09/Pokemon-GO-GEN-4-Pokedex.png"
    },
    title: `POKEDEX ENTRY NO. ${p.national_id}: ${p.names.en}`,
    url: `https://www.serebii.net/pokedex-sm/${p.national_id}.shtml`,
    description: `*${game1}: ${description1}\n\n${game2}: ${description2}*`,
    fields: [{name: "Type(s)", value: `${p.types}`, inline: "true"},
      {name: "Egg Group", value: `${p.egg_groups}`, inline: "true"},
      {name: "Abilities", value: `${p.abilities[0].name}, ${ability2}`, inline: "true"},
      {name: "Hidden Ability", value: `${hidden}`, inline: "true"},
      {name: "Base Stats", value: `*HP:* ${p.base_stats.hp}, *ATK:* ${p.base_stats.atk}, *DEF:* ${p.base_stats.def}, *SP ATK:* ${p.base_stats.sp_atk}, *SP DEF:* ${p.base_stats.sp_def}, *SPEED:* ${p.base_stats.speed}`, inline:"false"},
    ],
    thumbnail: {
      url: `https://play.pokemonshowdown.com/sprites/xydex/` + thumbnail + '.png',
    },
  }
})})});
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  selfbot: false,
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "pokedex",
  description: "A functioning pokedex! Type !pokedex <name> or !pokedex <1>",
  usage: "",
  usageDelim: "",
  type: "commands",
};
