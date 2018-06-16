const Discord = require("discord.js");
const FileSystem = require("fs");
var player = require("./../player.js");
var Weapon = require("./../_Classes/weapon.js")
var Armour = require("./../_Classes/armour.js")

module.exports.run = async (bot, message, params) => {

    //Get players
    let players = JSON.parse(FileSystem.readFileSync("./_Json/players.json", "utf8"));
    
    let invText = "```";

    if (players[message.author.id]) {
        character = Object.setPrototypeOf(players[message.author.id], player.prototype);

        invText += "--<Equipped>--------\n";


        let weap = Object.setPrototypeOf(character.weapon_mainhand, Weapon.prototype);
        let helm = Object.setPrototypeOf(character.armour_helmet, Armour.prototype);
        let body = Object.setPrototypeOf(character.armour_body, Armour.prototype);
        let legs = Object.setPrototypeOf(character.armour_legs, Armour.prototype);
        let boots = Object.setPrototypeOf(character.armour_boots, Armour.prototype);

        invText += ("< 0 > Weapon: " + weap.getName() + " " + weap.getDamageText() + "\n");
        invText += ("< 1 > Helmet: " + helm.getName() + " \n");
        invText += ("< 2 > Body  : " + body.getName() + " \n");
        invText += ("< 3 > Legs  : " + legs.getName() + " \n");
        invText += ("< 4 > Boots : " + boots.getName() + " \n");

        invText += "-------------------";
    }
    else
        return message.channel.send("You are not playing - type !start");

    invText += "```";

    return message.channel.send(invText);

}

module.exports.help =
    {
        name: "equipped"
    }