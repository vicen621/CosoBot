module.exports = {
    name: 'slowmode',
    execute(message, args) {

        if (!message.member.hasPermission('KICK_MEMBERS')) {
            message.author.send('No tienes los suficientes permisos para ejecutar este comando');
            return;
        }

        if (args[0]) {
            message.channel.setRateLimitPerUser(parseInt(args[0]));
            message.channel.send("El slowmode de este canal fue seteado a " + args[0] + " segundos!");
        } else {
            message.channel.send("Debes definir los segundos del slowmode!");
        }    
    }
}