const Discord = require("discord.js");
const FileSystem = require("fs");
var player = require("./../player.js");

module.exports.run = async (bot, message, params) => {
    

    //USAGE: "!clear 3" would clear most recent 3 messages.
    let players = JSON.parse(FileSystem.readFileSync("./_Json/players.json", "utf8"));
    if(!params[0])
    {
        return message.channel.send("Command Help: '!nickname JoeBloggs'")
    }
    else if(players[message.author.id])
    {
        character = Object.setPrototypeOf(players[message.author.id], player.prototype);
        character.changeName(params[0]);
    
        //save
        players[message.author.id] = character;

        //Write player to file
        FileSystem.writeFile("./_Json/players.json", JSON.stringify(players), (err)=> {
            if (err) console.log(err);
            else return message.channel.send("Nickname set!");
        });
        
    }
    else
        return message.channel.send("You are not playing - type !start");

}

module.exports.help =
    {
        name: "nickname"
    }