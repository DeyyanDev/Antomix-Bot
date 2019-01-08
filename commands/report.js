const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => 
{
		let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get((args[0])));
		if(!rUser) return message.channel.send("Couldn't find user");
		let reason = args.join(" ").slice(22);

		let reportEmbed = new Discord.RichEmbed()
		.setDescription("Reports")
		.setColor("#15f153")
		.addField("Reported user", `${rUser} with ID: ${rUser.id}`)
		.addField("Reported by", `${message.author}`)
		.addField("Channel", message.channel)
		.addField("Time", message.createdAt)
		.addField("Reason", reason);

		report_error = "Couldn't find reports channel! (create #reports text channel)";

		let reportschannel = message.guild.channels.find(`name`, "reports")
		if(!reportschannel) return message.channel.send(report_error); 

		message.delete().catch(O_o=>{});
		reportschannel.send(reportEmbed)
}

module.exports.help = 
{
	name: "report"
}