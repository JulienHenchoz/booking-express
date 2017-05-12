/*jshint esversion: 6 */

let graphql = require('graphql');

let venueInputType = require('./types/inputTypes/venue');
let venueType = require('./types/objectTypes/venue');
let venueSchema = require('../schemas/venue');

let eventInputType = require('./types/inputTypes/event');
let eventType = require('./types/objectTypes/event');
let eventSchema = require('../schemas/event');

let bookingInputType = require('./types/inputTypes/booking');
let bookingType = require('./types/objectTypes/booking');
let bookingSchema = require('../schemas/booking');

let mongoose = require('mongoose');

let mutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            createVenue: {
                type: venueType,
                args: {
                    venue: {
                        type: new graphql.GraphQLNonNull(venueInputType)
                    }
                },
                resolve: function (value, args) {
                    let Venue = mongoose.model('Venue', venueSchema);
                    console.log('Inserted venue in DB');
                    let venue = new Venue(args.venue);
                    return venue.save();
                }
            },
            createEvent: {
                type: eventType,
                args: {
                    event: {
                        type: new graphql.GraphQLNonNull(eventInputType)
                    }
                },
                resolve: function (value, args) {
                    let Event = mongoose.model('Event', eventSchema);
                    console.log('Inserted event in DB');
                    let event = new Event(args.event);
                    return event.save();
                }
            },
            createBooking: {
                type: bookingType,
                args: {
                    booking: {
                        type: new graphql.GraphQLNonNull(bookingInputType)
                    }
                },
                resolve: function (value, args) {
                    let Booking = mongoose.model('Booking', bookingSchema);
                    console.log('Inserted booking in DB');
                    let booking = new Booking(args.booking);
                    return booking.save();
                }
            }
        };
    }
});

module.exports = {
    mutationType
};