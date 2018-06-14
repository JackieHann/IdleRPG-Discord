const Discord = require("discord.js");
const FileSystem = require("fs");
var player = require("./../player.js");
var Weapon = require("./../_Classes/weapon.js")

module.exports.run = async (bot, message, params) => {

    //Get players
    let players = JSON.parse(FileSystem.readFileSync("./_Json/players.json", "utf8"));
    let pInfo = new Discord.RichEmbed();
    let invText = "```";

    if(players[message.author.id])
    {
        character = Object.setPrototypeOf(players[message.author.id], player.prototype);

        invText += "<ID >-<Inventory>--------\n";

         for(var i in character.weapInventory)
            {
                item = Object.setPrototypeOf(character.weapInventory[i], Weapon.prototype);
                invText += ("< "+ i + " > " + item.getName() + " " + item.getDamageText() + "\n");
            }
            


        invText += "--<" + (character.weapInventory.length) + "/" + character.weapInvLimit + ">--------------";
    }
    else
        return message.channel.send("You are not playing - type !start");
    
    invText += "```";

    return message.channel.send(invText);

}

module.exports.help =
    {
        name: "inventory"
    }