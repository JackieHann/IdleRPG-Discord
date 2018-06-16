const Discord = require("discord.js");
const FileSystem = require("fs");
var player = require("./../player.js");
var Weapon = require("./../_Classes/Weapon.js")
var Armour = require("./../_Classes/Armour.js")
module.exports.run = async (bot, message, params) => {

    //Get players
    let players = JSON.parse(FileSystem.readFileSync("./_Json/players.json", "utf8"));
    let pInfo = new Discord.RichEmbed();

    if(players[message.author.id])
    {
        character = Object.setPrototypeOf(players[message.author.id], player.prototype);
        let weap = Object.setPrototypeOf(character.weapon_mainhand, Weapon.prototype);
        let helm = Object.setPrototypeOf(character.armour_helmet, Armour.prototype);
        let body = Object.setPrototypeOf(character.armour_body, Armour.prototype);
        let legs = Object.setPrototypeOf(character.armour_legs, Armour.prototype);
        let boots = Object.setPrototypeOf(character.armour_boots, Armour.prototype);

        pInfo.setDescription("Character Information");
        pInfo.setColor("#ffa500");
        pInfo.setThumbnail(message.author.displayAvatarURL);
        pInfo.addField("Name: " + character.name, "Class: testClass", true);
        pInfo.addField("Level: " + character.level, "Exp: [" + character.currExp + " / " + character.nextLevelExp + "]", true)
        pInfo.addField("Location: " + character.getLocationName(character.location),"Gold: " + character.gold, true);
        pInfo.addField("Equipped Items: ", ("< 0 >" + weap.getName() + " " + weap.getDamageText() + "\n") + ("< 1 > Helmet: " + helm.getName() + " \n") + ("< 2 > Body  : " + body.getName() + " \n") + ("< 3 > Legs  : " + legs.getName() + " \n") + ("< 4 > Boots : " + boots.getName() + " \n"));
        
    }
    else
        return message.channel.send("You are not playing - type !start");
    


    return message.channel.send(pInfo);

}

module.exports.help =
    {
        name: "info"
    }