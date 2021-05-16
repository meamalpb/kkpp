require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
require('discord-buttons')(client);


client.on("ready",()=>{
    console.log(`${client.user.tag} is ready`);
});


// client.on("message",(message)=>{
//     if(message.author.bot)
//         return;
//     console.log(`${message.author.username} : ${message.content}`);
//     client.users.cache.get(message.author.id).send(message.content);

    // message.buttons('Hello World!', {
    //     buttons: [
    //         {
    //             style: 'green',
    //             label: 'Click to function!',
    //             id: 'click_to_function'
    //         }
    //     ]
    // })


});




client.login(process.env.BOT_TOKEN);