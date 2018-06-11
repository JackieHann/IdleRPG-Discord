const Discord = require("discord.js");
const FileSystem = require("fs");
var player = require("./../player.js");



module.exports.run = async (bot, message, params) => {
    //Get All current players
    let players = JSON.parse(FileSystem.readFileSync("./_Json/players.json", "utf8"));
    //let players = require("../_Json/players.json");

    //If theres not a player with that ID
    if(!players[message.author.id])
    {
        
        //Make a player at that ID
        players[message.author.id] = new player(message.author.username);
        
        //Write player to file
        FileSystem.writeFile("./_Json/players.json", JSON.stringify(players), (err)=> {
            if (err) console.log(err);
        });

        return message.channel.send("Added " + message.author.username + " to the roster.");
    }
    else
        return message.channel.send("You are already playing!")
    //load players at some point
//if(!players[5])
//    console.log("Couldnt find player with ID 5");
//else
//    console.log(players[5].coins);
//FileSystem.writeFile("./_Json/players.json", JSON.stringify(players), (err)=> {
//    if (err) console.log(err);
//}) 

    
    

}

module.exports.help =
    {
        name: "start"
    }