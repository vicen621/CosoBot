const { MessageButton } = require("discord-buttons");

module.exports = {
    name: 'sendreaction',
    execute (message) {
        let xoxix = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'xoxix');
        let xoxixWM = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'xoxix-wm');

        if (!message.member.hasPermission('KICK_MEMBERS')) {
            message.author.send('No tienes los suficientes permisos para ejecutar este comando');
            return;
        }

        const btn = new MessageButton()
            .setStyle("blurple")
            .setLabel("Toggle Alerts")
            .setID("toggleAlerts");

        message.channel.send('Clickea en el boton azul para habilitar/deshabilitar las notificaciones de UHC!', btn);
    }
}