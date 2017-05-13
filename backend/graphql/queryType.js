/*jshint esversion: 6 */
let graphql = require('graphql');
let mongoose = require('mongoose');
let venueSchema = require('../schemas/venue');
let eventSchema = require('../schemas/event');
let bookingSchema = require('../schemas/booking');

let objectTypes = require('./objectTypes');

let queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        /**
         * Venues
         */
        getVenues: {
            type: new graphql.GraphQLList(objectTypes.venue),
            resolve: function () {
                let Venue = mongoose.model('Venue', venueSchema);
                return Venue.find();
            }
        },
        getVenue: {
            type: objectTypes.venue,
            args: {
                id: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLID)
                }
            },
            resolve: function () {
                return {
                    _id: 1
                };
            }
        },
        /**
         * Events
         */
        getEvents: {
            type: new graphql.GraphQLList(objectTypes.event),
            resolve: function () {
                let Event = mongoose.model('Event', eventSchema);
                let Venue = mongoose.model('Venue', venueSchema);
                let Booking = mongoose.model('Booking', bookingSchema);
                return Event
                    .find()
                    .populate('venue')
                    .populate('bookings');
            }
        },
        getEvent: {
            type: objectTypes.event,
            args: {
                id: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLID)
                }
            },
            resolve: function (root, args) {
                let Event = mongoose.model('Event', eventSchema);
                return Event.findById(args.id).exec();
            }
        },
        /**
         * Bookings
         */
        getBookings: {
            type: new graphql.GraphQLList(objectTypes.booking),
            resolve: function () {
                let Booking = mongoose.model('Booking', bookingSchema);
                let Event = mongoose.model('Event', eventSchema);
                return Booking
                    .find()
                    .populate('event');
            }
        },
        getBooking: {
            type: objectTypes.booking,
            args: {
                id: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLID),
                }
            },
            resolve: function () {
                return {
                    _id: 1
                };
            }
        }
    })
});

module.exports = queryType;
