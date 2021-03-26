module.exports = {
    name: 'togglealert',
    description: 'toggles the alert for the UHC!',
    execute(message, args){
        let xoxix = message.guild.roles.cache.find(role => role.name === 'xoxix');
        let xoxixSM = message.guild.roles.cache.find(role => role.name === 'xoxix-WM');
        let author = message.member;

        if (message.member.roles.cache.some(role => role.name === 'xoxix')){
            message.guild.members.cache.get(author.id).roles.remove(xoxix)
            message.reply('Ya no recibiras notificaciones de UHC!');
            message.guild.members.cache.get(author.id).roles.add(xoxixSM)
            return;
        }else{
            message.guild.members.cache.get(author.id).roles.add(xoxix)
            message.reply('Ahora recibiras notificaciones de UHC!');
            message.guild.members.cache.get(author.id).roles.remove(xoxixSM)
            return;
        }
    }
}