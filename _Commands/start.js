const Discord = require("discord.js");

module.exports.run = async (bot, message, params) => {
    
    players.push(new player(message.author.username));
    return message.channel.send("Added " + message.author.username + " to the roster.");

}

module.exports.help =
    {
        name: "start"
    }