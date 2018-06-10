const Discord = require("discord.js");

module.exports.run = async (bot, message, params) => {
    //Get user to kick
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(params[0]));
    if (!kUser) return message.channel.send("Couldn't find user.");
    //Get rid of user ID
    let reason = params.join(" ").slice(22);

    //check if user can kick
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cannot use this command!");
    if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Member cant be kicked!");


    //Make a text box thing
    let kickText = new Discord.RichEmbed()
        .setDescription("Kicked")
        .setColor("#e56b00")
        .addField("User", kUser + " with ID: " + kUser.id, true)
        .addField("Kicked By", message.author, true)
        .addField("Channel", message.channel, true)
        .addField("Time", message.createdAt, true)
        .addField("Reason", reason, true);

    let kChannel = message.guild.channels.find(`name`, "reports");
    if (!rChannel) {
        console.log("There was no report channel in server: " + message.guild.name);
        return message.channel.send("Couldn't find reports channel");
    }

    //Delete last msg
    message.delete().catch(O_o => { });

    //Kick member
    message.guild.member(kUser).kick(reason);

    //send message to report channel
    rChannel.send(reportText);

    return;


}

module.exports.help =
    {
        name: "kick"
    }