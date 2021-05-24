![BFH Banner](https://trello-attachments.s3.amazonaws.com/542e9c6316504d5797afbfb9/542e9c6316504d5797afbfc1/39dee8d993841943b5723510ce663233/Frame_19.png)  

# KKPP 
#### KKPP - Kittiyal Kitti Poyal Poyi   
KKPP is a discord bot, that helps us to interact with CoWin API. A user can look-up availability of vaccines using filters such as district, pincode and age. 
Search using district is limited to Kerala, whereas no such restriction is there for pincode. Apart from manual checking, the bot also fetches updates every 
2 minutes for all the 14 districts in Kerala.

## Team members  
- [Amal PB](https://github.com/meamalpb)   
- [Amarnath CN](https://github.com/cnamar)
- [Bichu Ben Kuruvilla](https://github.com/ben-jnr)

## Team Id   
`BFH/receGQqI18HbrFQRg/2021`

## Link to product walkthrough   
[link to video]

## How it Works ? 
1. The bot must be given administrative permissions, else it may give incorrect outputs.
2. For automatic updates, admin needs to do basic setup first. Run `_setup` and then `_sync`. 
3. `_setup` will create 14 channels and `_sync` will start fetching updates every 2 minutes.
4. The bot can also take in user commands to give corresponding output. We can use `_help` to see available commands.  
5. The user can use various commands to change district or pincode and then check for available centers.
6. A normal user will only get updates of his selected district.

## Libraries used    
- axios      : ^0.21.1    
- discord.js : ^12.5.3   
- dotenv     : ^9.0.2   
- node-cron  : ^3.0.0   
- sequelize  : ^6.6.2   
- sqlite3    : ^5.0.2   

## How to configure   
#### Adding bot to your server 
- Open [discord developer portal](https://discord.com/developers/)
- Having selected Applications in the left tab, click on the button New Application.
- Fill required details, Go to OAuth2 in left tab. 
- Scroll down to Scopes, check the box `bot` and you will get a url. Open url to add bot to a server (1 server only).
#### Config to run the bot
- Install nodejs and npm.
- Clone the repo and create a file `.env` inside kkpp.
- In [discord developer portal](https://discord.com/developers/), go to `Bot` in the left tab and copy Token. 
- In `.env` insert a line : ` BOT_TOKEN = [Your token] `.
- Inside folder kkpp run : `npm i`, all the required modules will be installed.
- We are ready to run the bot

## How to Run    
- Inside kkpp run two commands in two terminals : `node ./src/bot.js` & `node ./src/auto/index.js`.
- This command will run two nodejs applications. bot.js is the main application & index.js for handling automatic updates.
- Open discord server and type in command `_help` to view all the commands.
