//Includes 
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const FileSystem = require("fs");
var player = require("./player.js");
//create a new client
const bot = new Discord.Client({disableEveryone: true});
//Where we store the commands
bot.commands = new Discord.Collection();

//playerData = JSON.parse(FileSystem.readFileSync("./_Json/players.json", "utf8"));
//playerArray = [];
//for(var i in playerData)
//    playerArray.push(Object.setPrototypeOf(playerData[i], player.prototype));
//
//playerArray[0].changeName("dd");
//console.log(playerData);

//Object storing IF THIS WORKS AAAAAAAAAAAAAAAAAAaaa
//let players = JSON.parse(FileSystem.readFileSync("./_Json/players.json", "utf8"));
//Let items in same way
//var p = new player(1);
//console.log(p);


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

   // if(!coins[message.author.id])
    //{
   //     coins[message.author.id] =
   //     {
    //        coins: 0
    //    };
   // }

  //  let coinAmt = Math.floor(Math.random() * 15) + 1;
   // let baseAmt = Math.floor(Math.random() * 15) + 1;
   // console.log(coinAmt + ":" + baseAmt);

   // if (coinAmt === baseAmt){
   //     coins[message.author.id] = {
   //         coins: coins[message.author.id].coins + coinAmt
   //     };
//
   //     FileSystem.writeFile("./_Json/coins.json", JSON.stringify(coins), (err)=> {
   //         if (err) console.log(err);
   //     })        
   // }

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




