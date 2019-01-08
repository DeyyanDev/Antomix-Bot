const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => 
{
		let sicon = message.guild.iconURL;
		let serverembed = new Discord.RichEmbed()
		.setDescription("Server Information")
		.setColor("#15f153")
		.setThumbnail(sicon)
		.addField("Server name", message.guild.name)
		.addField("Created on", message.guild.createdAt)
		.addField("You joined at", message.member.joinedAt)
		.addField("Total members", message.guild.memberCount);


		return message.channel.send(serverembed);
}

module.exports.help = 
{
	name: "serverinfo"
}