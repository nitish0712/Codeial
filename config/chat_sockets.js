
module.exports.chatSockets = function(socketServer){
    // console.log("reached chat socket.js");
    let io = require("socket.io")(socketServer);
    // console.log('io message', io.sockets);
    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

    });

}