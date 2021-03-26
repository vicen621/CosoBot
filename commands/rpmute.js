const ms = require('ms');

module.exports = {
    name: 'rpmute',
    description: 'this is a mute command!',
    execute(message, args) {
        const target = message.mentions.users.first();

        if (!message.member.hasPermission('KICK_MEMBERS')) {
            message.channel.send('No tienes los suficientes permisos para ejecutar este comando');
            return;
        }

        if (message.channel.name.toLowerCase() !== 'reportes-preguntas') {
            return;
        }

        if (target) {
            let mutedRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'rp-mute');
            let memberTarget = message.guild.members.cache.get(target.id);
            let canal = message.channel;

            if (target.id === message.author.id){
                message.channel.send('No podes desmutearte a vos mismo!');
                return;
            }

            if (memberTarget === message.author){
                message.channel.send('No podes mutearte a vos mismo!');
                return;
            }

            if (memberTarget.roles.cache.some(r => r.name.toLowerCase() === 'rp-mute')) {
                message.channel.send("Ese miembro ya esta muteado de reportes-preguntas!");
                return;
            }

            if (!args[1]) {
                memberTarget.roles.add(mutedRole);
                message.channel.send(`<@${memberTarget.user.id}> fue muteado de <#${canal.id}>!`);
                return;
            }

            memberTarget.roles.add(mutedRole);
            if (ms(args[1]) > Math.pow(2, 31) - 1) {
                message.channel.send(`<@${memberTarget.user.id}> fue muteado de <#${canal.id}> por 24d!`);
            } else {
                message.channel.send(`<@${memberTarget.user.id}> fue muteado de <#${canal.id}> por ${args[1]}!`);
            }

            setTimeout_(function () {
                memberTarget.roles.remove(mutedRole);
            }, ms(args[1]));
        } else {
            message.channel.send("No puedo encontrar a ese miembro!");
        }

        function setTimeout_(fn, delay) {
            var maxDelay = Math.pow(2, 31) - 1;

            if (delay > maxDelay) {
                var args = arguments;
                args[1] -= maxDelay;

                return setTimeout(function () {
                    setTimeout_.apply(undefined, args);
                }, maxDelay);
            }

            return setTimeout.apply(undefined, arguments);
        }

    }
}