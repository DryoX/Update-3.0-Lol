const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone:  true});
bot.commands = new Discord.Collection();

bot.on("ready", async () => {
  console.log(`${bot.user.name} is online!`)
  bot.user.setActivity("Use *commands Please!")
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}report`){

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user!");
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#00ffe9")
    .addField("Reported User", `${rUser} With ID: ${rUser.id}`)
    .addField("Reporter", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason);


    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Couldn't find reports channel.");

    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }

if(cmd === `${prefix}ping`){
  let acmd = message.channel.send(`Pong =>` + (bot.ping)+`ms!`)

  return message.channel.send(acmd);
}


if(cmd === `${prefix}kick`){

  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send("Can't find user!");
  let kReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nope, Permission Require");
  if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Too OP To Get Kick");

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("Kick")
  .setColor("#731dba")
  .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
  .addField("Kicked By", `<@${message.author.id}> with ID: ${message.author.id}`)
  .addField("Kicked In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", kReason);


  let kickChannel = message.guild.channels.find(`name`, `botlog`);
  if(!kickChannel) return message.channel.send("Can't find botlog channel");

  message.delete().catch(O_o=>{});
  message.guild.member(kUser).kick(kReason);
  kickChannel.send(kickEmbed);

  return;

}

if(cmd === `${prefix}brodcast`){

  let bcUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bcUser) return message.channel.send("Please Use This Format : brodcast (@brodcast) (information)");
  let bcInfo = args.join(" ").slice(22);

  let bcEmbed = new Discord.RichEmbed()
  .setDescription("~> Brodcast <~")
  .addField("Mentions To", `@everyone`)
  .setColor("RANDOM")
  .addField("Brodcasted By", `<@${message.author.id}> with ID: ${message.author.id}`)
  .addField("Brodcast At", message.channel)
  .addField("Time", message.createdAt)
  .addField("Information", bcInfo);

  let bcChannel = message.guild.channels.find(`name`, `brodcast`);
  if(!bcChannel) return message.channel.send("Please Ask The Owner/Create A brodcast Channel!");

  message.delete().catch(O_o=>{});
  bcChannel.send(bcEmbed);

  return;


}

if(cmd === `${prefix}ban`){

  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send("Can't find user!");
  let bReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Nope, Permission Require");
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Too OP To Get Ban");

  let banEmbed = new Discord.RichEmbed()
  .setDescription("This Player Banned Because Of This Report And Reason!")
  .setColor("#ff0000")
  .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
  .addField("Banned By", `<@${message.author.id}> with ID: ${message.author.id}`)
  .addField("Banned In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", bReason);


  let banChannel = message.guild.channels.find(`name`, `botlog`);
  if(!banChannel) return message.channel.send("Can't find botlog channel");

  message.delete().catch(O_o=>{});
  message.guild.member(bUser).ban(bReason);
  banChannel.send(banEmbed);

  return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

let prefix = prefixes[message.guild.id].prefixes;

}

  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.displayAvatarURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#00ffe9")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);


    return message.channel.send(serverembed);
  }

  if(cmd === `${prefix}profile`){

    let myprof = new Discord.RichEmbed()
    .setDescription("Your Profile Is!")
    .setColor("#00ffe9")
    .addField("Your Profile Created At", message.author.createdAt)
    .addField("You Joined This Server At", message.member.joinedAt)
    .addField("Your Role", message.member.role)
    .addField("Your Ping To The Bot!", bot.ping)
    .setTimestamp()

    return message.channel.send(myprof);

  }

  bot.on(`guildMemberAdd`, member => {
    var refox = member.guild.roles.find(`name`, `MVP`);
    member.addRole(refox);

  console.log(`${member}`, "Has Joined" + `${member.guild.name}`)

});

  if(cmd === `${prefix}testprogram441`){


      let ember = new Discord.RichEmbed()
      .setColor("RANDOM")
      .addField("FAILED")
      .setTimestamp()

      return message.channel.send(ember);

  }

  if(cmd === `${prefix}commands`){

    let commander = new Discord.RichEmbed()
    .setDescription("All Commands That I Have | My Global Prefix Is * ")
    .setColor("#00ffe9")
    .addField("Help Command", " ============================== ")
    .addField("commands", "Check All The Commands!")
    .addField("Admin Commands", " ============================== ")
    .addField("ban", "Usage: Ban (Name/id) (Reason)")
    .addField("kick", "Usage: Kick (Name/id) (Reason)")
    .addField("Public Commands", " ============================== ")
    .addField("brodcast", "Usage: Brodcast (@Brodcast) (Information)")
    .addField("profile", "Check Your Profile")
    .addField("serverinfo", "Check Server Status/Info")
    .addField("report", "Usage: Report (Name/id) (Reason)")
    .addField("botinfo", "Check Bot Status/Info")
    .addField("ping", "Check Your Ping To The Bot!")
    .setTimestamp()

    return message.channel.send(commander);

  }

  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.iconURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information - Created By RtzFurry")
    .setColor("#00ffe9")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt)
    .addField("Bot Creator", "@RtzFurry")
    .setTimestamp()

    return message.channel.send(botembed);
  }

});

bot.login(botconfig.token);
