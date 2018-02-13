'use strict';
process.env.NODE_ENV = "production";
const Hapi = require('hapi');
const config = require('config');
var firebase = require("firebase");
var async = require("async");

var configCredentials = {
    apiKey: "AIzaSyAunNnIL6Ni1g-oaMhfPZiuWymgmQfpL7c",
    authDomain: "hotel-search-db.firebaseapp.com",
    databaseURL: "https://hotel-search-db.firebaseio.com",
    projectId: "hotel-search-db",
    storageBucket: "hotel-search-db.appspot.com",
    messagingSenderId: "169652855813"
  };

const port = process.env.PORT || 5000;

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost', 
    port: port,
    routes: {cors:true}
});

firebase.initializeApp(configCredentials);

server.app.db=firebase.database();

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
