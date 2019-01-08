const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => 
{
		let bicon = bot.user.displayAvatarURL;
		let botembed = new Discord.RichEmbed()
		.setDescription("Bot info")
		.setColor("#000000")
		.setThumbnail(bicon)
		.addField("Bot name", bot.user.username)
		.addField("Developed by", "DeyyanDev")
		.addField("Last updated", "1/7/2019");

		return message.channel.send(botembed);
}

module.exports.help = 
{
	name: "botinfo"
}