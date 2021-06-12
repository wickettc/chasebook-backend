const io = require('socket.io')({
    cors: {
        origin: 'http://localhost:8080',
    },
});
const socketapi = {
    io,
    connectedUsers: {},
};

io.on('connection', function (socket) {
    console.log('A user connected');
    socket.on('login', (userID) => {
        if (userID !== null) {
            socketapi.connectedUsers[socket.id] = userID;
            console.log(socketapi.connectedUsers);
        }
    });

    socket.on('logout', () => {
        delete socketapi.connectedUsers[socket.id];
    });
});

module.exports = socketapi;
