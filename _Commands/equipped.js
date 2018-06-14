const Discord = require("discord.js");
const FileSystem = require("fs");
var player = require("./../player.js");
var Weapon = require("./../_Classes/weapon.js")

module.exports.run = async (bot, message, params) => {

    //Get players
    let players = JSON.parse(FileSystem.readFileSync("./_Json/players.json", "utf8"));
    
    let invText = "```";

    if (players[message.author.id]) {
        character = Object.setPrototypeOf(players[message.author.id], player.prototype);

        invText += "--<Equipped>--------\n";


        item = Object.setPrototypeOf(character.weapon_mainhand, Weapon.prototype);
        invText += ("< 0 > Weapon: " + item.getName() + " " + item.getDamageText() + "\n");

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