require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();


client.on("ready",()=>{
    console.log(`${client.user.tag} is ready`);
});


client.on("message",(message)=>{
    if(message.author.bot)
        return;
    console.log(`${message.author.username} : ${message.content}`);
    client.users.cache.get(message.author.id).send(message.content);
});


client.login(process.env.BOT_TOKEN);