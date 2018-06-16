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

        invText += "{ Command: }-{        Name         }--{ Rarity }--{ Damage }--{Value}-----\n";

        let rarityGap = 25;
        let damageGap = 10;
        let sellGap = 10;
        let lastWeapIndex = 0;
        let amtOfWeapons = 0;

        for (var i in character.weapInventory) {

            item = Object.setPrototypeOf(character.weapInventory[i], Weapon.prototype);
            let raritySpaces = new Array(rarityGap - item.getName().length + 1).join(" ");
            let damageSpaces = new Array(damageGap - raritySpaces - item.getRarityName(item.rarity).length + 1).join(" ");

            let index = "< !equip " + i + " > ";
            if (i.toString().length > 1)
                index = "< !equip " + i + "> ";

            let spacesTakeAway = 0;
            if (item.getDamageText().length > 6)
                for (var j = 0; j < (item.getDamageText().length - 6); j++) {
                    spacesTakeAway++;
                }

            let sellSpaces = new Array(sellGap - damageSpaces - spacesTakeAway - item.getSellPrice().toString().length + 1).join(" ");
            
            lastWeapIndex = i;
            amtOfWeapons ++;
            invText += (index + item.getName() + raritySpaces + "[" + item.getRarityName(item.rarity) + "]" + damageSpaces + item.getDamageText() + sellSpaces + item.getSellPrice() + "g\n");

        }

        for (var k in character.armInventory) {

            let ind = (parseInt(k) + parseInt(lastWeapIndex) + 1);

            if(amtOfWeapons === 0)
                ind = (parseInt(k) + parseInt(lastWeapIndex));


            item = Object.setPrototypeOf(character.armInventory[k], Armour.prototype);
            let raritySpaces = new Array(rarityGap - item.getName().length + 1).join(" ");
            let damageSpaces = new Array(damageGap - raritySpaces - item.getRarityName(item.rarity).length + 1).join(" ");

            let index = "< !equip " + ind + " > ";
            if (ind.toString().length > 1)
                index = "< !equip " + ind + "> ";

            let sellSpaces = new Array(sellGap - item.getSellPrice().toString().length + 1).join(" ");

            invText += (index + item.getName() + raritySpaces + "[" + item.getRarityName(item.rarity) + "]" + damageSpaces  + sellSpaces + "      "+ item.getSellPrice() + "g\n");

        }

        invText += "--<" + (parseInt(character.weapInventory.length) + parseInt(character.armInventory.length)) + "/" + character.weapInvLimit + ">-------------------------------------------------------------------";
    }
    else
        return message.channel.send("You are not playing - type !start");

    invText += "```";

    return message.channel.send(invText);

}

module.exports.help =
    {
        name: "inv"
    }