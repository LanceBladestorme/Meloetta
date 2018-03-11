const komada = require("komada");

const client = new komada.Client({
  ownerID : "205450306388099073",
  prefix: "!",
  clientOptions: {
    fetchAllMembers: false,
  },
  cmdLogging: true,
});

client.login(process.env.BOT_TOKEN);
