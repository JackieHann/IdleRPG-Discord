//Includes 
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const FileSystem = require("fs");
var player = require("./player.js");
var Weapon = require("./_Classes/Weapon.js");
//create a new client
const bot = new Discord.Client({ disableEveryone: true });
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
FileSystem.readdir("./_Commands/", (err, files) => {
    if (err) console.log(err);

    //Reads in files which have a .js extention :)
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Commands not found!");
        return;
    }

    //for every file we found
    jsfile.forEach((f, i) => {
        //Load it into bot commands
        let props = require(`./_Commands/${f}`);
        console.log(`${f} loaded..`);
        bot.commands.set(props.help.name, props);
    });
});

//Login to the server
bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("around with JS");

    bot.channels.find("id", "455113318345211907")
        .send("Oi Oi we back in business");
});

//Check for messages
bot.on("message", async message => {

    //If the message came from the bot, or is a dm, dont do anything duh
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = botconfig.prefix;                  //Prefix we are looking for is a exclamation
    let messageArr = message.content.split(" ");    //message is stored in an array separated by spaces
    let command = messageArr[0];                    //Command is the fist bit of the message
    let params = messageArr.slice(1);               //Params are anything after first bit of message

    let commandFile = bot.commands.get(command.slice(prefix.length));
    if (commandFile) {
        commandFile.run(bot, message, params);
        return;
    }
    else if (command.charAt(0) === prefix) {
        message.channel.send("Invalid Command!");
        return;
    }


});

setInterval(function () {
    action = Math.floor(Math.random() * 3);

    if (action != 0) {
        doSomething();
    }

}, 1000);

//Shop every 3 min
setInterval(function () {
    let shopChannel = bot.channels.find("id", "455847271544651788");

    shopChannel.bulkDelete(1).then(()=>
    {
        console.log("Cleared Shop Inventory");
        shopText = refreshShop();
        shopChannel.send(shopText)

    });
}, 300000);

function refreshShop(){

    playerData = JSON.parse(FileSystem.readFileSync("./_Json/players.json", "utf8"));
    shopArray = [];

    let playerCount = 0;
    let totalLevels = 0;

    for(var i in playerData)
    {
        totalLevels += playerData[i].level;
        playerCount++; 
    }

    let levelOfShop = Math.floor(totalLevels / playerCount);

    for(var i = 0; i < 8; i++)
    {
        shopArray.push(new Weapon(levelOfShop));
        
    }
    console.log(shopArray);

    //Write player to file
    FileSystem.writeFile("./_Json/shop.json", JSON.stringify(shopArray), (err) => {
        if (err) console.log(err);
    });

    return (showShop(shopArray));
};

function showShop(shopArray)
{

    let shopText = "```{ Command: }-{        Name         }--{ Rarity }--{ Damage }--{Price}-----\n";

    let rarityGap = 25;
    let damageGap = 10;
    let sellGap = 10;

    for(var i in shopArray)
            {
                
                item = Object.setPrototypeOf(shopArray[i], Weapon.prototype);
                let raritySpaces = new Array(rarityGap - item.getName().length + 1).join(" ");
                let damageSpaces = new Array(damageGap - raritySpaces -  item.getRarityName(item.rarity).length + 1).join(" ");

                let index = "\n< !buy   " + i + " > ";
                if(i.toString().length > 1)
                    index = "\n< !buy   " + i + "> ";

                let spacesTakeAway = 0;
                if(item.getDamageText().length > 6)
                    for(var i = 0; i < (item.getDamageText().length - 6); i++)
                    {
                        spacesTakeAway++;
                    }

                let sellSpaces = new Array(sellGap - damageSpaces - spacesTakeAway - (item.getSellPrice() * 5).toString().length + 1).join(" ");

                shopText += (index + item.getName() + raritySpaces + "[" + item.getRarityName(item.rarity) + "]" + damageSpaces + item.getDamageText() + sellSpaces  + (item.getSellPrice()* 5) + "g\n");
            
            }
            
        shopText += "---------------------------------------------------------------------------```";

        return shopText;
};


function savePlayerData(players) {
    //Write player to file
    FileSystem.writeFile("./_Json/players.json", JSON.stringify(players), (err) => {
        if (err) console.log(err);
    });
};

function doSomething() {
    //All players
    playerData = JSON.parse(FileSystem.readFileSync("./_Json/players.json", "utf8"));
    playerArray = [];

    //Amount of players
    amountOfPlayers = 0;
    for (var i in playerData) {
        playerArray.push(playerData[i]);
        amountOfPlayers++;
    }

    if(amountOfPlayers === 0)
        return;

    //Pick a random player
    let randomIndex = Math.floor(Math.random() * (amountOfPlayers));
    let playerID = playerArray[randomIndex].id;

    //Get that player
    let thePlayer_ = Object.setPrototypeOf(playerData[playerID], player.prototype);

    //Do something with that player

    let didWhat = thePlayer_.progress();

    if (!didWhat) {
        console.log("Didnt output");
    }
    else
        bot.channels.find("id", "455113318345211907").send(didWhat);

    //Check if player levelled up
    let levelledUp = thePlayer_.checkLevelUp();
    if (levelledUp === true)
        bot.channels.find("id", "455113318345211907").send("<@" + playerID + "> is now Lvl: " + thePlayer_.level + ". Next Lvl in " + (thePlayer_.nextLevelExp - thePlayer_.currExp) + " exp.");

    //Overwrite players info with new info
    playerData[playerID] = thePlayer_;
    savePlayerData(playerData);
}

bot.login(botconfig.token);




