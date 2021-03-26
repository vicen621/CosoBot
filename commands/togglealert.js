module.exports = {
    name: 'togglealert',
    description: 'toggles the alert for the UHC!',
    execute(message, args){

        if (message.channel.name !== "togglealert") return;

        let xoxix = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'xoxix');
        let xoxixSM = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'xoxix-wm');
        let author = message.member;

        if (message.member.roles.cache.some(role => role.name === 'xoxix')){
            message.member.roles.remove(xoxix);
            message.reply('Ya no recibiras notificaciones de UHC!');
            message.member.roles.add(xoxixSM);
            return;
        }else{
            message.guild.members.cache.get(author.id).roles.add(xoxix)
            message.reply('Ahora recibiras notificaciones de UHC!');
            message.member.roles.remove(xoxixSM);
            return;
        }
    }
}