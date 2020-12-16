// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();
const config = require('./config.json');

const prefix = 'iz!';

var playerlist = [];

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    // Commands \/

    if (command === 'add') {
        const taggedUser = message.mentions.users.first();
        console.log(taggedUser);
        playerlist.push(taggedUser);
        remaining = (10 - playerlist.length)
        message.channel.send("**Current Players:**\n" + playerlist.join('\r\n') + "\n\n**There are " + playerlist.length + " players**\n" + remaining + " players are needed for a full game");
        console.log(playerlist);
        return
    } else if (command === 'clear') {
        playerlist = [];
        message.channel.send("Cleared the Player List");
        return
    } else if (command === 'remove') {
        for( var i = 0; i < playerlist.length; i++){ 
                                   
            if ( playerlist[i] === message.mentions.users.first()) { 
                playerlist.splice(i, 1); 
                i--; 
            }
        }
        remaining = (10 - playerlist.length)
        message.channel.send("**Current Players:**\n" + playerlist.join('\r\n') + "\n\n**There are " + playerlist.length + " players**\n" + remaining + " players are needed for a full game");
        return
    } else if (command === 'list') {
        if (!playerlist.length) {
            return message.channel.send("The Player List is currently empty. Use `iz!add @USER` to add a player, or `iz!help` for more commands.")
        }
        remaining = (10 - playerlist.length)
        message.channel.send("**Current Players:**\n" + playerlist.join('\r\n') + "\n\n**There are " + playerlist.length + " players**\n" + remaining + " players are needed for a full game");
        return
    } else if (command === 'help') {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('AmongIz Commands List')
            .addFields({
                name: '`iz!add @USER`',
                value: 'Adds a player to the list of all current players',
                inline: true
            }, {
                name: '`iz!remove @USER`',
                value: 'Removes a player from the list of all current players',
                inline: true
            }, {
                name: '`iz!list`',
                value: 'Lists all current players',
                inline: true
            }, {
                name: '`iz!clear`',
                value: 'Clears the list of all current players',
                inline: true
            }, )

        message.channel.send(helpEmbed);
        return
    } else {
        message.channel.send("Command not Found")
        return
    }
});

// login to Discord with your app's token
client.login(config.token);