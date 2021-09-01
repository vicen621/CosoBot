module.exports = {
    name: 'togglealert',
    description: 'toggles the alert for the UHC!',
    execute(message) {

        if (message.channel.name !== "togglealert") return;

        let xoxix = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'xoxix');
        let xoxixSM = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'xoxix-wm');
        let author = message.member;

        if (author.roles.cache.some(role => role.name === 'xoxix')) {
            author.roles.remove(xoxix).catch(console.error);
            message.reply('Ya no recibiras notificaciones de UHC!');
            author.roles.add(xoxixSM).catch(console.error);
            return;
        } else {
            author.roles.add(xoxix).catch(console.error);
            message.reply('Ahora recibiras notificaciones de UHC!');
            author.roles.remove(xoxixSM).catch(console.error);
            return;
        }
    }
}