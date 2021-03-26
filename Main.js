const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = "c!";

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('CosoBot is online!');
})

client.on('message', message => {

    if (message.isMemberMentioned(client.user)){
        message.reply('My prefix is c!');
    }

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping'){
        client.commands.get('ping').execute(message, args);
    }else if (command === 'togglealert'){
        client.commands.get('togglealert').execute(message, args);
    }
})

client.login('ODI1MDI0NjU0MDk5NDgwNjM2.YF36FQ.VOS9I97dezbV7Z00HS3bK5bV6FU');