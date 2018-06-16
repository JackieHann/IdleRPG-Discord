const Discord = require("discord.js");
const FileSystem = require("fs");
var player = require("./../player.js");
var Weapon = require("./../_Classes/weapon.js");
var Armour = require("./../_Classes/armour.js")


module.exports.run = async (bot, message, params) => {
    
    //USAGE: "!equip 2 would equip the item with index 2 in inventory.
    let players = JSON.parse(FileSystem.readFileSync("./_Json/players.json", "utf8"));
    
    if(players[message.author.id] && params[0] != undefined)
    {
        character = Object.setPrototypeOf(players[message.author.id], player.prototype);

        if(character.weapInventory[parseInt(params[0])])
        {
            //Weapon to sell
            let sellWeap = Object.setPrototypeOf(character.weapInventory[parseInt(params[0])], Weapon.prototype);
            
            //Remove weapon from inventory
            let newInv = [];
            for (var i in character.weapInventory)
            {
                if (i != params[0])
                    newInv.push(character.weapInventory[i]);
            }

            character.gold += sellWeap.getSellPrice();
            //Overwrite inventory
            character.weapInventory = newInv;
            players[message.author.id] = character;

            //Write player to file
            FileSystem.writeFile("./_Json/players.json", JSON.stringify(players), (err) => {
                if (err) console.log(err);
            });

            return message.channel.send("Sold Item: " + sellWeap.getName() + " for " + sellWeap.getSellPrice() + "g");

        }
        else if(character.armInventory[parseInt(params[0]) - (parseInt(character.weapInventory.length))])
        {
            let indexToDelete = parseInt(params[0]) - (parseInt(character.weapInventory.length));
            let sellArm = Object.setPrototypeOf(character.armInventory[indexToDelete], Armour.prototype);

            let newInv = [];
            for (var i in character.armInventory)
            {
                if (i != indexToDelete)
                    newInv.push(character.armInventory[i]);
            }

            character.gold += sellArm.getSellPrice();

            //Overwrite inventory
            character.armInventory = newInv;
            players[message.author.id] = character;

            //Write player to file
            FileSystem.writeFile("./_Json/players.json", JSON.stringify(players), (err) => {
                if (err) console.log(err);
            });

            return message.channel.send("Sold Item: " + sellArm.getName() + " for " + sellArm.getSellPrice() + "g");

        }
        else if (params[0] === "all")
        {
            let numItems = 0;
            let totGold = 0;

            for (var i in character.weapInventory)
            {
                let sellWeap = Object.setPrototypeOf(character.weapInventory[i], Weapon.prototype);
                numItems ++;
                totGold += sellWeap.getSellPrice();
            }
            for (var j in character.armInventory)
            {
                let sellArm = Object.setPrototypeOf(character.armInventory[j], Armour.prototype);
                numItems ++;
                totGold += sellArm.getSellPrice();
            }

            character.gold += totGold;
            character.weapInventory = [];
            character.armInventory = [];

            players[message.author.id] = character;

            //Write player to file
            FileSystem.writeFile("./_Json/players.json", JSON.stringify(players), (err) => {
                if (err) console.log(err);
            });

            return message.channel.send("Sold '" + numItems + "' items for a total of " + totGold + " gold.")
        }
        else
        {
            return message.channel.send("Item ID " + params[0] + " doesnt exist!");
        }
        //item = Object.setPrototypeOf(character.weapInventory[i], Weapon.prototype);
        //invText += ("< "+ i + " > " + item.getName() + " " + item.getDamageText() + "\n");
        
            


        //invText += "--<" + (character.weapInventory.length) + "/" + character.weapInvLimit + ">--------------";
    }
    else
        return message.channel.send("Command: !equip ItemID");
    
    //invText += "```";

    return message.channel.send("SOLD");

}

module.exports.help =
    {
        name: "sell"
    }