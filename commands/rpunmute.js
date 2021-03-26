module.exports = {
    name: 'rpunmute',
    description: 'this is a unmute command!',
    execute(message) {
        const target = message.mentions.users.first();

        if (!message.member.hasPermission('KICK_MEMBERS')){
            message.channel.send('No tienes los suficientes permisos para ejecutar este comando');
            return;
        }

        if (message.channel.name.toLowerCase() !== 'reportes-preguntas'){
            return;
        }

        if (target){
            let mutedRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'rp-mute');
            let memberTarget = message.guild.members.cache.get(target.id);

            if (memberTarget === message.author){
                message.channel.send('No podes desmutearte a vos mismo!');
                return;
            }

            if (!memberTarget.roles.cache.some(r => r.name.toLowerCase() === 'rp-mute')){
                message.channel.send("Ese miembro no esta muteado de reportes-preguntas!");
                return;
            }

            memberTarget.roles.remove(mutedRole);
            message.channel.send(`<@${memberTarget.user.id}> fue desmuteado de <#${canal.id}>!`);
        }else{
            message.channel.send("No puedo encontrar a ese miembro!");
        }
    }
}