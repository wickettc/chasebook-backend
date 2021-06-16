const io = require('socket.io')({
    cors: {
        origin: 'http://localhost:8080',
    },
});
const socketapi = {
    io,
    users: [],
};

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) return next(new Error('invalid username'));
    socket.username = username;
    next();
});

io.on('connection', function (socket) {
    for (let [id, socket] of socketapi.io.of('/').sockets) {
        socketapi.users.push({
            userID: id,
            username: socket.username,
        });
    }
    socket.emit('users', socketapi.users);
    socket.broadcast.emit('user connected', {
        userID: socket.id,
        username: socket.username,
    });
    // console.log('A user connected');
    // socket.on('login', (userID) => {
    //     if (userID !== null) {
    //         socketapi.connectedUsers[socket.id] = userID;
    //         console.log(socketapi.connectedUsers);
    //     }
    // });

    // socket.on('logout', () => {
    //     delete socketapi.connectedUsers[socket.id];
    // });
});

module.exports = socketapi;
