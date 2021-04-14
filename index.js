const Discord = require('discord.js');
const { token } = require('./config/token.js');
const { rsi } = require('./taapi');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    // const my_channel = client.channels.cache.get('828475666638700574');
    // 831711593058009138
    
    // const mainLoop = client.setInterval(() => {
    //     rsi().then((res) => {
    //         const rsiValue = res.value;
    //         let msg = `[+] ${rsiValue} `
    //         if (rsiValue >= 70) {
    //             msg += "과매수 상태"
    //             my_channel.send(msg);
    //         } else if (rsiValue <= 30) {
    //             msg += "과매도 상태"
    //             my_channel.send(msg);
    //         }
    //     })
    // }, 60000);
});

client.on('message', msg => {
    if (msg.content === '!') {
        msg.reply('ScomBin running...');
    }

    if (msg.content === '!ping') {
        msg.reply('Pang!');
    }

    if (msg.content === "!rsi"){
        rsi().then((res) => {
            msg.reply(`rsi value = ${res.value}`);
        })
    }

    if (msg.content.slice(0, 4) === "!add") {
        let my_channel = msg.channel;
        let channel_id = my_channel.id;
        msg.reply(`${channel_id}(channel ID) added to alert channel list!`);
        
        const mainLoop = client.setInterval(() => {
            rsi().then((res) => {
                const rsiValue = res.value;
                let msg = `[+] ${rsiValue} `
                if (rsiValue >= 70) {
                    msg += "과매수 상태"
                    my_channel.send(msg);
                } else if (rsiValue <= 30) {
                    msg += "과매도 상태"
                    my_channel.send(msg);
                }
                // my_channel.send(msg);
            })
        }, 60000);
    }
});

client.login(token);