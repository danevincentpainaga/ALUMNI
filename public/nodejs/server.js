// const io = require('socket.io')(8000);
// var Redis = require('ioredis');
// var redis = new Redis();
// const client =  Redis.createClient();

// io.on('connection', (socket) => {
//     // io.emit('message', 'This is from server...');
//     // const redisClient = Redis.createClient();

//     redis.psubscribe('test-channel');

//     console.log("Redis server running.....");

//     // redis.on("message", function(channel, message) {
//     //     console.log(message);
//     //     // client.emit(channel, message);
//     //     io.em+-it('messageSend', message);
//     // });

//     // redis.on('disconnect', function() {
//     //     redisClient.quit();
//     // });
// redis.on("pmessage", function(channel, message) {
//   // Receive message Hello world! from channel news
//   // Receive message Hello again! from channel music
//   console.log("Receive message %s from channel %s", message, channel);
// });


// redis.on("error", function (err) {
//     console.log("Error " + err);
// });
// });
const SOCKET_PORT = 8000;
const REDIS = {
    "host": "127.0.0.1",
    "port": "6379",
    "password": "",
    "family": 4
}
function handler(request, response) {
    response.writeHead(200);
    response.end('');
}
var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var ioRedis = require('ioredis');
var redis = new ioRedis(REDIS);
app.listen(SOCKET_PORT, function() {
    console.log(new Date + ' - Server is running on port ' + SOCKET_PORT + ' and listening Redis on port ' + REDIS.port + '!');
});
io.on('connection', function(socket) {
    console.log('A client connected');
});
redis.psubscribe('laravel_database_test-channel', function(err, count) {
    console.log('Subscribed');
});
redis.on('pmessage', function(subscribed, channel, data) {
    data = JSON.parse(data);
    console.log(new Date);
    console.log(channel);
    io.emit(channel, data);
});

// redis.on('disconnect', function() {
//     redis.quit();
// });