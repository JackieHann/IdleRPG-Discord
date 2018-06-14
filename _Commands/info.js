const Discord = require("discord.js");
const FileSystem = require("fs");
var player = require("./../player.js");
var Weapon = require("./../_Classes/weapon.js")

module.exports.run = async (bot, message, params) => {

    //Get players
    let players = JSON.parse(FileSystem.readFileSync("./_Json/players.json", "utf8"));
    let pInfo = new Discord.RichEmbed();

    if(players[message.author.id])
    {
        character = Object.setPrototypeOf(players[message.author.id], player.prototype);
        weap = Object.setPrototypeOf(character.weapon_mainhand, Weapon.prototype);


        pInfo.setDescription("Character Information");
        pInfo.setColor("#ffa500");
        pInfo.setThumbnail(message.author.displayAvatarURL);
        pInfo.addField("Name: " + character.name, "Class: testClass", true);
        pInfo.addField("Level: " + character.level, "Exp: [" + character.currExp + " / " + character.nextLevelExp + "]", true)
        pInfo.addField("Location: " + character.getLocationName(character.location),"Gold: " + character.gold, true);
        pInfo.addField("Equipped Items: ", "< 0 >" + weap.getName() + " " + weap.getDamageText());
        
    }
    else
        return message.channel.send("You are not playing - type !start");
    


    return message.channel.send(pInfo);

}

module.exports.help =
    {
        name: "info"
    }