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
    }

    configureSockets() {
        new Sockets( this.io );
    }

    middlewares() {
        // Display public directory
        this.app.use( express.static( path.resolve(__dirname, '../public') ));

        // CORS
        this.app.use( cors() );
    }

    execute() {
        // Initialize Middlewares
        this.middlewares();

        // Initialize sockets
        this.configureSockets();

        // Initialize Server
        this.server.listen( this.port, () => {
            console.log('Server running on port: ', this.port);
        });
    }

}


module.exports = Server;