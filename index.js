const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
	if(err) console.log(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js")
	if(jsfile.length <= 0)
	{
		console.log("Couldn't find commands.");
		return;
	}

	jsfile.forEach((f, i) =>{
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded!`);
		bot.commands.set(props.help.name, props);

	})

})



bot.on("ready", async () => {
	console.log('Antomix Bot is online!');
	console.log('Last updated : [ 8.1.2019. ] ');
	bot.user.setActivity("Fortnite", {Type: "PLAYING" } )

});

bot.on("message", async message =>{
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;

	let prefix = botconfig.prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);

	let commandfile = bot.commands.get(cmd.slice(prefix.length));
	if(commandfile) commandfile.run(bot, message, args);

	if(cmd === '/hello')
	{
		return message.channel.send("Hello everyone!");
	}
	if(cmd === '/cmds')
	{
		let reportEmbed = new Discord.RichEmbed()
		.setDescription("Commands")
		.setColor("#15f153")
		.addField("/serverinfo", "Info about current server")
		.addField("/botinfo", "Info about Antomix Bot :)")
		.addField("/hello", "Try out")
		.addField("/api", "Shows current API version");
	
		return message.channel.send(reportEmbed);
	}
	if(cmd === '/api')
	{
		return message.reply("API : 1.0, Token: xc27zehjsf-325gjn");

	}
	if(cmd === '/rules')
	{
		let rulesEmbed = new Discord.RichEmbed()
		.setDescription("Rules")
		.setColor("#15f153")
		.addField("1.) No spam", "Please don't spam, we want to our server look good :)")
		.addField("2.) Respect others", "We appreciate each others, so be on our side!")
		.addField("3.) Don't swear on not NSFW", "Everyone swears, but there are kids around, you can swear in NSFW channels :)")
		.addField("4.) Basically thats it!", "You can ask anyone for help!")
		.addField("ENJOY", "Thanks for joining our server!");

		return message.channel.send(rulesEmbed);
	}

});

bot.login(botconfig.token);
