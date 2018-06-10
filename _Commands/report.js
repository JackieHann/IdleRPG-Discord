const Discord = require("discord.js");

module.exports.run = async (bot, message, params) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(params[0]));
    if (!rUser) return message.channel.send("Couldn't find user.");
    let reason = params.join(" ").slice(22);

    let reportText = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#15f629")
        .addField("User", rUser + " with ID: " + rUser.id, true)
        .addField("Reported By", message.author, true)
        .addField("Channel", message.channel, true)
        .addField("Time", message.createdAt, true)
        .addField("Reason", reason, true);

    let rChannel = message.guild.channels.find(`name`, "reports");
    if (!rChannel) {
        console.log("There was no report channel in server: " + message.guild.name);
        return message.channel.send("Couldn't find reports channel");
    }

    //Delete last msg
    message.delete().catch(O_o => { });
    rChannel.send(reportText);

    return;

}

module.exports.help =
    {
        name: "report"
    }