const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = "c!";

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('CosoBot is online!');
    client.uset.setStatus('dnd');
    client.user.setActivity('CosoUHC.club', { type: 'PLAYING' })
})

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message);
    } else if (command === 'togglealert') {
        client.commands.get('togglealert').execute(message);
    } else if (command === 'mute'){
        client.commands.get('mute').execute(message, args);
    } else if (command === 'unmute'){
        client.commands.get('unmute').execute(message);
    } else if (command === 'rpmute'){
        client.commands.get('rpmute').execute(message,args);
    } else if (command === 'rpunmute'){
        client.commands.get('rpunmute').execute(message);
    } else if (command === 'hola'){
        client.commands.get('hola').execute(message);
    } else if (command === 'slowmode'){
        client.commands.get('slowmode').execute(message, args);
    }
})

client.login();