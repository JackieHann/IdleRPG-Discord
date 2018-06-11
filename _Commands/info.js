const Discord = require("discord.js");
const FileSystem = require("fs");
var player = require("./../player.js");

module.exports.run = async (bot, message, params) => {

    //Get players
    let players = JSON.parse(FileSystem.readFileSync("./_Json/players.json", "utf8"));
    let pInfo = new Discord.RichEmbed();

    if(players[message.author.id])
    {
        character = Object.setPrototypeOf(players[message.author.id], player.prototype);

        pInfo.setDescription("Character Information");
        pInfo.setColor("#ffa500");
        pInfo.setThumbnail(message.author.displayAvatarURL);
        pInfo.addField("Name: ", character.name, true);
        pInfo.addField("Class: ", "testClass", true);
        pInfo.addField("Level: ", character.level, true)
        pInfo.addField("Exp: ", "[" + character.currExp + " / " + character.nextLevelExp + "]", true);
        pInfo.addField("Location: ", character.getLocationName(character.location), true);
        pInfo.addField("Gold: ", character.gold, true);
        
    }
    else
        return message.channel.send("You are not playing - type !start");
    


    return message.channel.send(pInfo);

}

module.exports.help =
    {
        name: "info"
    }