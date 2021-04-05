const Discord = require('discord.js');
const { token } = require('./config/token.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const my_channel = client.channels.cache.get('828475666638700574');
    
    const mainLoop = client.setInterval(() => {
        
        my_channel.send("asdf");
    }, 1000);
});

client.on('message', msg => {
    if (msg.content === '?') {
        msg.reply('ScomBin running...');
    }


    if (msg.content === 'ping') {
        msg.reply('Pang!');
    }
});

client.login(token);