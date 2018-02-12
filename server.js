'use strict';
process.env.NODE_ENV = "production";
const Hapi = require('hapi');
const config = require('config');

// Create a server with a host and port
const server = new Hapi.Server(~~process.env.PORT || 5000, '0.0.0.0');
server.connection({
    routes: {cors:true}
});

internals.test = function (request, reply) {

    reply('Success!\n');
};

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
