const ms = require('ms');

module.exports = {
    name: 'mute',
    description: 'this is a mute command!',
    execute(message, args) {
        const target = message.mentions.users.first();

        if (!message.member.hasPermission('KICK_MEMBERS')){
            message.channel.send('No tienes los suficientes permisos para ejecutar este comando');
            return;
        }

        if (target){
            let mutedRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted');
            let memberTarget = message.guild.members.cache.get(target.id);

            if (memberTarget.roles.highest.position > message.member.roles.highest.position || memberTarget.roles.highest.position > message.member.guild.me.roles.highest.position){
                message.channel.send('No puedo mutear a ese miembro porque su rango es mayor que el mio!');
                return;
            }

            if (memberTarget.roles.cache.some(r => r.name.toLowerCase() === 'muted')){
                message.channel.send("Ese miembro ya esta muteado!");
                return;
            }

            if (!args[1]) {
                memberTarget.roles.add(mutedRole);
                message.channel.send(`<@${memberTarget.user.id}> fue muteado!`);
                return;
            }

            memberTarget.roles.add(mutedRole);
            if (ms(args[1]) > Math.pow(2,31)-1){
                message.channel.send(`<@${memberTarget.user.id}> fue muteado por 24d!`);
            }else {
                message.channel.send(`<@${memberTarget.user.id}> fue muteado por ${args[1]}!`);
            }

            setTimeout_(function(){
                memberTarget.roles.remove(mutedRole);
            }, ms(args[1]));
        }else{
            message.channel.send("No puedo encontrar a ese miembro!");
        }

        function setTimeout_ (fn, delay) {
            var maxDelay = Math.pow(2,31)-1;

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