
class Sockets {

    constructor( io ) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            // Listen event
            socket.on('client-message', data => {
                console.log( data );
                this.io.emit( 'server-message', data );
            });

        });
    }

}


module.exports = Sockets;