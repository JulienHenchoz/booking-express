/*jshint esversion: 6 */
let graphql = require('graphql');
let mongoose = require('mongoose');
let venueSchema = require('../schemas/venue');
let venueType = require('./types/objectTypes/venue');
let eventSchema = require('../schemas/event');
let eventType = require('./types/objectTypes/event');
let bookingSchema = require('../schemas/booking');
let bookingType = require('./types/objectTypes/booking');

let queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            venues: {
                type: new graphql.GraphQLList(venueType),
                resolve: function () {
                    let Venue = mongoose.model('Venue', venueSchema);
                    return Venue.find();
                }
            },
            events: {
                type: new graphql.GraphQLList(eventType),
                resolve: function () {
                    let Event = mongoose.model('Event', eventSchema);
                    return Event.find();
                }
            },
            bookings: {
                type: new graphql.GraphQLList(bookingType),
                resolve: function () {
                    let Booking = mongoose.model('Booking', bookingSchema);
                    return Booking.find();
                }
            }
        };
    }
});

module.exports = queryType;