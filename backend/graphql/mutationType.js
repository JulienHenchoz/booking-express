/*jshint esversion: 6 */

let graphql = require('graphql');

let inputTypes = require('./types/inputTypes');
let venueActions = require('./actions/venues');
let eventActions = require('./actions/events');
let bookingActions = require('./actions/bookings');

let objectTypes = require('./types/objectTypes');

let mutationType = new graphql.GraphQLObjectType({
        name: 'Mutation',
        fields: () => ({
            /**
             * Venues actions
             */
            createVenue: {
                type: objectTypes.venue,
                args: {
                    venue: {
                        type: new graphql.GraphQLNonNull(inputTypes.venue)
                    }
                },
                resolve: venueActions.create
            },
            editVenue: {
                type: objectTypes.venue,
                args: {
                    venueId: {
                        type: new graphql.GraphQLNonNull(graphql.GraphQLID)
                    },
                    venue: {
                        type: new graphql.GraphQLNonNull(inputTypes.venue)
                    }
                },
                resolve: venueActions.edit
            },
            removeVenue: {
                type: objectTypes.venue,
                args: {
                    venueId: {
                        type: new graphql.GraphQLNonNull(graphql.GraphQLID)
                    }
                },
                resolve: venueActions.remove
            },
            /**
             * Events actions
             */
            createEvent: {
                type: objectTypes.event,
                args: {
                    event: {
                        type: new graphql.GraphQLNonNull(inputTypes.event)
                    }
                },
                resolve: eventActions.create
            },
            editEvent: {
                type: objectTypes.event,
                args: {
                    eventId: {
                        type: new graphql.GraphQLNonNull(graphql.GraphQLID)
                    },
                    event: {
                        type: new graphql.GraphQLNonNull(inputTypes.event)
                    }
                },
                resolve: eventActions.edit
            },
            removeEvent: {
                type: objectTypes.event,
                args: {
                    eventId: {
                        type: new graphql.GraphQLNonNull(graphql.GraphQLID)
                    }
                },
                resolve: eventActions.remove
            },
            /**
             * Booking actions
             */
            createBooking: {
                type: objectTypes.booking,
                args: {
                    booking: {
                        type: new graphql.GraphQLNonNull(inputTypes.booking)
                    }
                },
                resolve: bookingActions.create
            },
            editBooking: {
                type: objectTypes.booking,
                args: {
                    bookingId: {
                        type: new graphql.GraphQLNonNull(graphql.GraphQLID)
                    },
                    booking: {
                        type: new graphql.GraphQLNonNull(inputTypes.booking)
                    }
                },
                resolve: bookingActions.edit
            },
            removeBooking: {
                type: objectTypes.booking,
                args: {
                    bookingId: {
                        type: new graphql.GraphQLNonNull(graphql.GraphQLID)
                    }
                },
                resolve: bookingActions.remove
            }
        })
    })
;

module.exports = {
    mutationType
};
