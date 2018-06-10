const Discord = require("discord.js");

module.exports.run = async (bot, message, params) => {
    
    var str = "Currently Playing: ";

            players.forEach(player => {
                str += player.name;
                str += ", ";
            });
            str += ".";

            return message.channel.send(str)

}

module.exports.help =
    {
        name: "online"
    }