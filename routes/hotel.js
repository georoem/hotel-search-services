// 'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');
var hotels = require('./data.json'); 

exports.register = function (server, options, next) {

    const db = server.app.db;

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply('Success!');
        }
    });

    server.route({
        method: 'GET',
        path: '/hotel',
        handler: function (request, reply) {
            reply(hotels);
        }
    });

    server.route({
        method: 'GET',
        path: '/hotel/{id}',
        handler: function (request, reply) {

            // db.hotel.findOne({
            //     _id: request.params.id
            // }, (err, doc) => {

            //     if (err) {
            //         return reply(Boom.wrap(err, 'Internal MongoDB error'));
            //     }

            //     if (!doc) {
            //         return reply(Boom.notFound());
            //     }

            //     reply(doc);
            // });

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
            filteredHotels = hotels.filter(
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
        }
    });

    server.route({
        method: 'POST',
        path: '/hotel',
        handler: function (request, reply) {

            const hotel = request.payload;

            //Create an id
            hotel._id = uuid.v1();

            // db.hotel.save(hotel, (err, result) => {

            //     if (err) {
            //         return reply(Boom.wrap(err, 'Internal MongoDB error'));
            //     }

            //     reply(hotel);
            // });
        },
        config: {
            validate: {
                payload: {
                    _type: Joi.string().min(1).max(50).required(),
                    _typeTitle: Joi.string().min(1).max(100).required() , 
                    _description: Joi.string().min(1).max(100).required(),
                    _color: Joi.string().min(1).max(10).required(),
                    _icon: Joi.string().min(1).max(50).required(), 
                    _wordsTypehotel: Joi.array().min(1).required()
                }
            }
        }
    });

    server.route({
        method: 'PATCH',
        path: '/hotel/{id}',
        handler: function (request, reply) {

            // db.hotel.update({
            //     _id: request.params.id
            // }, {
            //     $set: request.payload
            // }, function (err, result) {

            //     if (err) {
            //         return reply(Boom.wrap(err, 'Internal MongoDB error'));
            //     }

            //     if (result.n === 0) {
            //         return reply(Boom.notFound());
            //     }

            //     reply().code(204);
            // });
        },
        config: {
            validate: {
                payload: Joi.object({
                    payload: {
                        _type: Joi.string().min(1).max(50).optional(),
                        _typeTitle: Joi.string().min(1).max(100).optional() , 
                        _description: Joi.string().min(1).max(100).optional(),
                        _color: Joi.string().min(1).max(10).optional(),
                        _icon: Joi.string().min(1).max(50).optional(), 
                    }
                }).required().min(1)
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/hotel/{id}',
        handler: function (request, reply) {

            // db.hotel.remove({
            //     _id: request.params.id
            // }, function (err, result) {

            //     if (err) {
            //         return reply(Boom.wrap(err, 'Internal MongoDB error'));
            //     }

            //     if (result.n === 0) {
            //         return reply(Boom.notFound());
            //     }

            //     reply().code(204);
            // });
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-hotel'
};
