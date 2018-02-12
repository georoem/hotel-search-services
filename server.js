'use strict';
process.env.NODE_ENV = "production";
const Hapi = require('hapi');
const config = require('config');

const port = process.env.port || 3000;
const host = process.env.host || '0.0.0.0';

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: host, 
    port: port,
    routes: {cors:true}
});

server.register([
    require('./routes/hotel'),
], (err) => {

    if (err) {
        throw err;
    }

    // Start the server
    server.start((err) => {
        console.log('Server running at:', server.info.uri);
    });

});
