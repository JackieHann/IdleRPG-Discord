const Discord = require("discord.js");
const FileSystem = require("fs");
var player = require("./../player.js");

module.exports.run = async (bot, message, params) => {
    
    let players = JSON.parse(FileSystem.readFileSync("./_Json/players.json", "utf8"));

    var str = "There is currently ";
    let numOfPlayers = 0;

    for(var player in players){
        numOfPlayers ++;
    };

    str += numOfPlayers;
    str += " players currently active";
    return message.channel.send(str);
}

module.exports.help =
    {
        name: "online"
    }