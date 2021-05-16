require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '_';
const axios = require('axios');

const newEmbed = new Discord.MessageEmbed().setTitle("District List").setDescription('\n1.Alappuzha\n2.Ernakulam\n3.Idukki\n4.Kannur\n5.kasargode\n6.Kollam\n7.Kottayam\n8.Kozhikode\n9.Malappuram\n10.Palakkad\n11.Pathanamthitta\n12.Truandrum\n13.Thrissur\n14.Wayanad\nCommand:\n_district 1   |  _district 2  |  _district 3 ...')

client.on("ready",async()=>{
    console.log(`${client.user.tag} is ready`);
});


client.on("message",async(message)=>{
    if(message.author.bot)
        return;

    if(message.content==`${prefix}menu`){
        axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/districts/17',
{
    headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0',
      },
},)
.then((response)=>{
    const districts=response.data.districts;
    console.log(districts)
    return message.channel.send(newEmbed);

})
        
    }


});


client.login(process.env.BOT_TOKEN);