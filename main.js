//Includes 
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

//create a new client
const bot = new Discord.Client({disableEveryone: true});

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

    //Prefix we are looking for is a backslash
    let prefix = botconfig.prefix;

    //message is stored in an array separated by spaces
    let messageArr = message.content.split(" ");

    //Command is the fist bit of the message
    let command = messageArr[0];

    let params = messageArr.slice(1);

    if (command === `${prefix}test`)
    {
        return message.channel.send("You requested a test with parameters: " + params);
    };

});




bot.login(botconfig.token);




