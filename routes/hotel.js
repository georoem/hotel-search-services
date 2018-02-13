'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');

exports.register = function (server, options, next) {

    const db = server.app.db;

    server.route({
        method: 'GET',
        path: '/hotel',
        handler: function (request, reply) {
            db.ref('/hotel').once('value').then(function(snapshot) {
                reply(snapshotToArray(snapshot));
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/hotel/{id}',
        handler: function (request, reply) {
            const id = request.params.id;
            db.ref('/hotel/'+id).once('value').then(function(snapshot) {
                reply(snapshot.val());
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/hotel/filter/',
        handler: function (request, reply) {
            var filteredHotels=[];
            var params = request.query
            var filteredHotels=[];
            var name = params.name ? params.name : '';
            var stars = params.stars ? params.stars : [1,2,3,4,5];
            var ref = db.ref('/hotel').once('value').then(function(snapshot) {
                filteredHotels = snapshotToArray(snapshot).filter(
                    hotel => {
                        if(name.length==0) {
                            return (stars == hotel.stars || stars.indexOf(hotel.stars)>-1);
                        }
                        else {
                            return hotel.name.toLowerCase().indexOf(name.toLowerCase())>-1 &&
                            (stars == hotel.stars || stars.indexOf(hotel.stars)>-1);
                        }
                });
                reply(filteredHotels);
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/hotel',
        handler: function (request, reply) {

            const hotel = request.payload;
            const result = db.ref('/hotel').push(hotel);
            reply(result);
        }
    });

    server.route({
        method: 'POST',
        path: '/hotel/all',
        handler: function (request, reply) {

            const hotels = request.payload;

            hotels.forEach(hotel => {
                db.ref('/hotel').push(hotel);
            });

            reply(hotels);
            
        }
    });

    server.route({
        method: 'PATCH',
        path: '/hotel/{id}',
        handler: function (request, reply) {
            const id = request.params.id;
            const hotel = request.payload;
            const result = db.ref('/hotel/'+id).set(hotel);
            reply(result);
        }
    });

    server.route({
        method: 'DELETE',
        path: '/hotel/{id}',
        handler: function (request, reply) {
            const id = request.params.id;
            const result = db.ref('/hotel/'+id).remove(); 
            reply(result);
        }
    });

    return next();
};

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

exports.register.attributes = {
    name: 'routes-hotel'
};
