module.exports = {
    name: 'ping',
    description: 'this is a ping command!',
    execute(message) {
        message.author.send('Pong! :sunglasses::call_me:')
    }
}