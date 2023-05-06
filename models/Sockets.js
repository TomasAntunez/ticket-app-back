const TicketList = require('./Ticket-list');


class Sockets {

    constructor( io ) {
        this.io = io;

        // Create an TicketList instance
        this.ticketList = new TicketList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('Client connected');

            socket.on( 'request-ticket', (data, callback) => {
                const newTicket = this.ticketList.createTicket();
                callback( newTicket );
            });

            socket.on( 'next-ticket-work', ({ agent, desk }, callback) => {

                const hisTicket = this.ticketList.assignTicket( agent, desk );
                callback( hisTicket );

                this.io.emit( 'assigned-ticket', this.ticketList.lastThirteen );
            });

        });
    }

}


module.exports = Sockets;