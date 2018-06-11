const Discord = require("discord.js");

module.exports.run = async (bot, message, params) => {
    
    //USAGE: "!clear 3" would clear most recent 3 messages.

    
    if(!message.member.hasPermission("MANAGE_MESSAGES") || !params[0])
    {
        message.reply("oof.")
            .then(msg=> msg.delete(3000));
        return;
    }
    message.channel.bulkDelete(params[0] + 1).then(()=>
    {
        message.channel.send("Cleared " + [params[0] +" messages."])
            .then(msg=> msg.delete(3000))
    });

}

module.exports.help =
    {
        name: "clear"
    }