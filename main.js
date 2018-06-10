//Includes 
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const FileSystem = require("fs");
//create a new client
const bot = new Discord.Client({disableEveryone: true});
//Where we store the commands
bot.commands = new Discord.Collection();

//Read files from command folder
FileSystem.readdir("./_Commands/", (err, files)=> {
    if (err) console.log(err);

    //Reads in files which have a .js extention :)
    let jsfile = files.filter(f=> f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Commands not found!");
        return;
    }

    //for every file we found
    jsfile.forEach((f, i) =>{
        //Load it into bot commands
        let props = require(`./_Commands/${f}`);
        console.log(`${f} loaded..`);
        bot.commands.set(props.help.name, props);
    });
});

require("./player.js");

class player
{
    constructor(name)
    {
        this.name = name;
        this.level = "1";
    }
}



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

    //If the message came from the bot, or is a dm, dont do anything duh
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    
    let prefix = botconfig.prefix;                  //Prefix we are looking for is a exclamation
    let messageArr = message.content.split(" ");    //message is stored in an array separated by spaces
    let command = messageArr[0];                    //Command is the fist bit of the message
    let params = messageArr.slice(1);               //Params are anything after first bit of message

    let commandFile = bot.commands.get(command.slice(prefix.length));
    if(commandFile)
    {
        commandFile.run(bot, message, params);
        return;
    }
    else if(command.charAt(0) === prefix)
    {
        message.channel.send("Invalid Command!");
        return;
    }
    

});

//setInterval(function()
//{
//   bot.channels.find("id", "455113318345211907").send("Doing Something..");
//    //bot.channel.send("working");
//}, 3000);


bot.login(botconfig.token);




