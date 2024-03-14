// socketHandler.js
const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('A client connected');

        // Example: Handle rider accepting request event
        socket.on('riderAccept', (userId) => {
            io.emit(`user_${userId}_notification`, 'Your request has been accepted by a rider.');
        });

        // Handle disconnections
        socket.on('disconnect', () => {
            console.log('A client disconnected');
        });
    });
};

module.exports = socketHandler;
