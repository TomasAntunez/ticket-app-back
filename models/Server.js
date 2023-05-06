// Express server
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const Sockets  = require('./Sockets');
const cors     = require('cors');


class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer( this.app );

        // Sockets config
        this.io = socketio( this.server, { /* settings */ } );

        // Initialize sockets
        this.sockets = new Sockets( this.io );
    }

    // configureSockets() {
    //     new Sockets( this.io );
    // }

    middlewares() {
        // Display public directory
        this.app.use( express.static( path.resolve(__dirname, '../public') ));

        // CORS
        this.app.use( cors() );

        this.app.get( '/last-tickets', (req, res) => {
            res.json({
                ok: true,
                last: this.sockets.ticketList.lastThirteen
            })
        });
    }

    execute() {
        // Initialize Middlewares
        this.middlewares();

        // Initialize Server
        this.server.listen( this.port, () => {
            console.log('Server running on port: ', this.port);
        });
    }

}


module.exports = Server;