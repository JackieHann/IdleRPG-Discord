const Discord = require("discord.js");

module.exports.run = async (bot, message, params) => {
    
    let sIcon = message.guild.iconURL;
            let sInfo = new Discord.RichEmbed()
                .setDescription("Server Information")
                .setColor("#15f629")
                .setThumbnail(sIcon)
                .addField("Server Name", message.guild.name)
                .addField("Created On", message.guild.createdAt)
                .addField("You Joined", message.member.joinedAt)
                .addField("Total Members", message.guild.memberCount);

            return message.channel.send(sInfo);

}

module.exports.help =
    {
        name: "serverinfo"
    }