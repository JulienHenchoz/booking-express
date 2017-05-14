/*jshint esversion: 6 */
let graphql = require('graphql');

let objectTypes = require('./types/objectTypes');
let venueActions = require('./actions/venues');
let eventActions = require('./actions/events');
let bookingActions = require('./actions/bookings');

let queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        /**
         * Venues
         */
        getVenues: {
            type: new graphql.GraphQLList(objectTypes.venue),
            resolve: venueActions.list,
            getVenue: {
                type: objectTypes.venue,
                args: {
                    id: {
                        type: new graphql.GraphQLNonNull(graphql.GraphQLID)
                    }
                },
                resolve: venueActions.get
            },
        },
        getVenue: {
            type: objectTypes.venue,
            args: {
                venueId: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLID)
                }
            },
            resolve: venueActions.get
        },
        /**
         * Events
         */
        getEvents: {
            type: new graphql.GraphQLList(objectTypes.event),
            resolve: eventActions.list
        },
        getEvent: {
            type: objectTypes.event,
            args: {
                eventId: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLID)
                }
            },
            resolve: eventActions.get
        },
        /**
         * Bookings
         */
        getBookings: {
            type: new graphql.GraphQLList(objectTypes.booking),
            args: {
                eventId: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLID)
                }
            },
            resolve: bookingActions.list
        },
        getBooking: {
            type: objectTypes.booking,
            args: {
                id: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLID),
                }
            },
            resolve: bookingActions.get
        }
    })
});

module.exports = queryType;
