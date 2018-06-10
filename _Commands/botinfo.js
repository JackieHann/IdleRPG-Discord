const Discord = require("discord.js");

module.exports.run = async (bot, message, params) => {
    let bInfo = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("#15f629")
        .setThumbnail(bot.user.displayAvatarURL)
        .addField("Bot Name", bot.user.username)
        .addField("Created On", bot.user.createdAt);

    return message.channel.send(bInfo);

}

module.exports.help =
    {
        name: "botinfo"
    }