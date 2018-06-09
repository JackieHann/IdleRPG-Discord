//Includes 
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const Commands = require("./Commands.js")
require("./player.js");

class player
{
    constructor(name)
    {
        this.name = name;
        this.level = "1";
    }
}

//create a new client
const bot = new Discord.Client({disableEveryone: true});

//load players at some point
var players = [];

//Login to the server
bot.on("ready", async() =>
{
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("around with JS");
});

//Check for messages
bot.on("message", async message =>
{

    //If the message came from the bot, dont do anything duh
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    
    let prefix = botconfig.prefix;                  //Prefix we are looking for is a backslash
    let messageArr = message.content.split(" ");    //message is stored in an array separated by spaces
    let command = messageArr[0];                    //Command is the fist bit of the message
    let params = messageArr.slice(1);               //Params are anything after first bit of message

    //If prefix has been used, treat it as a command
    if (command.charAt(0) === prefix)
    {
        console.log(message.author.username + ` attempted command: ` + command);
        command = command.slice(1);

        if(command === `info`)
        {
            let pInfo = new Discord.RichEmbed();

            pInfo.setDescription("Character Information");
            pInfo.setColor("#ffa500");
            pInfo.setThumbnail(message.author.displayAvatarURL);
            pInfo.addField("Name: ", message.author.username, true);
            pInfo.addField("Class: ", "testClass", true);
            pInfo.addField("Level: ", "1", true)
            pInfo.addField("Exp: ", "0", true);
            
    
            return message.channel.send(pInfo);
        }
        else if(command === `botinfo`)
        {
            let bInfo = new Discord.RichEmbed();
            bInfo.setDescription("Bot Information");
            bInfo.setColor("#15f629");
            bInfo.setThumbnail(bot.user.displayAvatarURL);
            bInfo.addField("Bot Name", bot.user.username);
            bInfo.addField("Created On", bot.user.createdAt);

            return message.channel.send(bInfo);
        }
        else if(command === `serverinfo`)
        {
            let sIcon = message.guild.iconURL;

            let sInfo = new Discord.RichEmbed()
            .setDescription("Server Information")
            .setColor("#15f629")
            .setThumbnail(sIcon)
            .addField("Server Name", message.guild.name)
            .addField("Created On", message.guild.createdAt)
            .addField("You Joined", message.member.joinedAt)
            .addField("Total Members", message.guild.memberCount);

            return message.channel.send(sInfo);
        }
        else if (command === `start`)
        {
            players.push(new player(message.author.username));
            return message.channel.send("Added " +  message.author.username + " to the roster.");
        }
        else if (command === `online`)
        {
            var str = "Currently Playing: ";

            players.forEach(player => {
                str += player.name;
                str += ", ";
            });
            str += ".";

            return message.channel.send(str)
        }
        else
        {
            return message.channel.send("Invalid Command!");
        }

    };

});

//setInterval(function()
//{
//   bot.channels.find("id", "455113318345211907").send("Doing Something..");
//    //bot.channel.send("working");
//}, 3000);


bot.login(botconfig.token);




