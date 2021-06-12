const io = require('socket.io')({
    cors: {
        origin: 'http://localhost:8080',
    },
});
const socketapi = {
    io,
    connectedUsers: {},
};

// Add your socket.io logic here!
io.on('connection', function (socket) {
    console.log('A user connected');
    socket.on('register', (userID) => {
        socket.userID = userID;
        socketapi.connectedUsers[userID] = socket;
        console.log(socketapi);
    });
});
// end of socket.io logic

module.exports = socketapi;
