const Discord = require("discord.js");
const FileSystem = require("fs");
var player = require("./../player.js");
var Weapon = require("./../_Classes/weapon.js");
var Armour = require("./../_Classes/armour.js")


module.exports.run = async (bot, message, params) => {

    //USAGE: "!equip 2 would equip the item with index 2 in inventory.
    let players = JSON.parse(FileSystem.readFileSync("./_Json/players.json", "utf8"));

    if (players[message.author.id] && params[0] != undefined) {
        character = Object.setPrototypeOf(players[message.author.id], player.prototype);

        let amountOfWeapons = 0;
        for (var i in character.weapInventory) {
            amountOfWeapons ++;
        }

        if (character.weapInventory[parseInt(params[0])]) {
            console.log("SWITCH WEAPS");
            let newWeap = Object.setPrototypeOf(character.weapInventory[parseInt(params[0])], Weapon.prototype);
            let oldWeap = Object.setPrototypeOf(character.weapon_mainhand, Weapon.prototype);

            character.weapInventory[parseInt(params[0])] = oldWeap;
            character.weapon_mainhand = newWeap;

            players[message.author.id] = character;
            //Write player to file
            FileSystem.writeFile("./_Json/players.json", JSON.stringify(players), (err) => {
                if (err) console.log(err);
            });

            return message.channel.send("Equipped Item: " + newWeap.getName());

        }
        else if (character.armInventory[parseInt(params[0]) - parseInt(amountOfWeapons)]) {
            console.log("SWITCH ARMOUR");
            let newArm = Object.setPrototypeOf(character.armInventory[parseInt(params[0]) - parseInt(amountOfWeapons)], Armour.prototype);
            let armType = newArm.type;
            let oldArm = undefined;

            switch (armType) {
                case 0:
                    oldArm = Object.setPrototypeOf(character.armour_helmet, Armour.prototype);
                    character.armInventory[parseInt(params[0]) - parseInt(amountOfWeapons)] = oldArm;
                    character.armour_helmet = newArm;
                    break;
                case 1:
                    oldArm = Object.setPrototypeOf(character.armour_body, Armour.prototype);
                    character.armInventory[parseInt(params[0]) - parseInt(amountOfWeapons)] = oldArm;
                    character.armour_body = newArm;
                    break;
                case 2:
                    oldArm = Object.setPrototypeOf(character.armour_legs, Armour.prototype);
                    character.armInventory[parseInt(params[0]) - parseInt(amountOfWeapons)] = oldArm;
                    character.armour_legs = newArm;
                    break;
                case 3:
                    oldArm = Object.setPrototypeOf(character.armour_boots, Armour.prototype);
                    character.armInventory[parseInt(params[0]) - parseInt(amountOfWeapons)] = oldArm;
                    character.armour_boots = newArm;
                    break;
            }

            //save
            players[message.author.id] = character;
            //Write player to file
            FileSystem.writeFile("./_Json/players.json", JSON.stringify(players), (err) => {
                if (err) console.log(err);
            });

            return message.channel.send("Equipped Item: " + newArm.getName());

        }
        else {
            return message.channel.send("Item ID " + params[0] + " doesnt exist!");
        }
        //item = Object.setPrototypeOf(character.weapInventory[i], Weapon.prototype);
        //invText += ("< "+ i + " > " + item.getName() + " " + item.getDamageText() + "\n");




        //invText += "--<" + (character.weapInventory.length) + "/" + character.weapInvLimit + ">--------------";
    }
    else
        return message.channel.send("Command: !equip ItemID");

    //invText += "```";

    return message.channel.send("Switched");

}

module.exports.help =
    {
        name: "equip"
    }