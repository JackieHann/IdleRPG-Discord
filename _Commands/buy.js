const Discord = require("discord.js");
const FileSystem = require("fs");
var player = require("./../player.js");
var Weapon = require("./../_Classes/weapon.js")


module.exports.run = async (bot, message, params) => {

    //USAGE: "!equip 2 would equip the item with index 2 in inventory.
    let players = JSON.parse(FileSystem.readFileSync("./_Json/players.json", "utf8"));
    let shop = JSON.parse(FileSystem.readFileSync("./_Json/shop.json", "utf8"));

    if (players[message.author.id] && params[0] != undefined) {
        character = Object.setPrototypeOf(players[message.author.id], player.prototype);

        if (shop[parseInt(params[0])]) {

            if (character.weapInventory.length < character.weapInvLimit) {
                //Weapon to sell
                let itemToBuy = Object.setPrototypeOf(shop[parseInt(params[0])], Weapon.prototype);

                if((itemToBuy.getSellPrice() * 5) <= character.gold)
                {
                    character.weapInventory.push(itemToBuy);
                    character.gold -= (itemToBuy.getSellPrice() * 5);
                    //Overwrite inventory
                    players[message.author.id] = character;

                //Write player to file
                FileSystem.writeFile("./_Json/players.json", JSON.stringify(players), (err) => {
                    if (err) console.log(err);
                });
                return message.channel.send("Bought Item: " + itemToBuy.getName() + ". You have " + character.gold + "g remaining...");
                }
                else
                {
                    return message.channel.send("You require " + ((itemToBuy.getSellPrice() * 5) - character.gold) + "g to afford " + itemToBuy.getName() + ".");
                }
            }
            else {
                return message.channel.send("No space in your inventory! Use ***!sell id*** or ***!sell all*** to make some room!");
            }

        }
        else {
            return message.channel.send("Item ID " + params[0] + " doesnt exist in the shop!");
        }
        //item = Object.setPrototypeOf(character.weapInventory[i], Weapon.prototype);
        //invText += ("< "+ i + " > " + item.getName() + " " + item.getDamageText() + "\n");




        //invText += "--<" + (character.weapInventory.length) + "/" + character.weapInvLimit + ">--------------";
    }
    else
        return message.channel.send("Command: !buy ItemID");


}

module.exports.help =
    {
        name: "buy"
    }