
function info(message)
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
};