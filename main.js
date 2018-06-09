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

    
    let prefix = botconfig.prefix;                  //Prefix we are looking for is a backslash
    let messageArr = message.content.split(" ");    //message is stored in an array separated by spaces
    let command = messageArr[0];                    //Command is the fist bit of the message
    let params = messageArr.slice(1);               //Params are anything after first bit of message

    //EG of use:
    //if (command === `${prefix}test`)
    //{
    //    return message.channel.send("You requested a test with parameters: " + params);
    //};

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
        else
        {
            return message.channel.send("Invalid Command!");
        }

    };

});




bot.login(botconfig.token);




