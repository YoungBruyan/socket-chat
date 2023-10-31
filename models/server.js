const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./socket');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.port;

        // Http server
        this.server = http.createServer(this.app);

        // Configuración del socket server
        this.io = socketio(this.server, {/* */});
    }

    middleware() {
        //Despegar el directorio publico
        this.app.use( express.static(path.resolve(__dirname, '../public')) );
    }
    
    configurarSockets() {
        new Sockets( this.io );
    }
    
    execute(){
        //Inicializar middleware
        this.middleware();

        // Inicializar sockets
        this.configurarSockets();

        //Inicializar Server
        this.server.listen(this.port, () => {
            console.log(`Server corriendo en el puerto ${this.port}`);
        });
    }
    
}

module.exports = Server;