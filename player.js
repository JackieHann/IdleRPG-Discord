const Discord = require("discord.js");
//var bot;

class player
{
    constructor(nickname, index)
    {
        this.name = nickname;
        this.level = 1;
        this.currExp = 0;
        this.gold = 0;
    };

    changeName(newName)
    {
         this.name = newName;
    }; 
}



module.exports = player;