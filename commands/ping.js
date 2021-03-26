module.exports = {
    name: 'ping',
    description: 'this is a ping command!',
    execute(message) {
        if (message.channel.name !== "spam-rico") return;
        message.author.send('Pong! :sunglasses::call_me:');
    }
}