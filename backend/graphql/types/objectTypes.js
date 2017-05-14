/*jshint esversion: 6 */

let graphql = require('graphql');

let event = new graphql.GraphQLObjectType({
        name: 'Event',
        fields: () => ({
            _id: {
                type: graphql.GraphQLID
            },
            name: {
                type: graphql.GraphQLString
            },
            startDate: {
                type: graphql.GraphQLString
            },
            description: {
                type: graphql.GraphQLString
            },
            venue: {
                type: venue
            },
            bookings: {
                type: new graphql.GraphQLList(booking)
            },
            nbExpected: {
                type: graphql.GraphQLInt,
                resolve: function (event) {
                    var nbExpected = 0;
                    event.bookings.map(function (booking) {
                        nbExpected += booking.nbExpected;
                    });
                    return nbExpected;
                }
            },
            nbBookings: {
                type: graphql.GraphQLInt,
                resolve: function (event) {
                    return event.bookings.length;
                }
            },
            seatsLeft: {
                type: graphql.GraphQLInt,
                resolve: function (event) {
                    var nbExpected = 0;
                    event.bookings.map(function (booking) {
                        nbExpected += booking.nbExpected;
                    });
                    return typeof(event.venue) !== null ? event.venue.capacity - nbExpected : 0;
                }
            },
            occupancyPercentage: {
                type: graphql.GraphQLInt,
                resolve: function (event) {
                    if (event.venue === null || event.venue.capacity === 0) {
                        return 0;
                    }
                    console.log("Hop");
                    var nbExpected = 0;
                    event.bookings.map(function (booking) {
                        nbExpected += booking.nbExpected;
                    });
                    console.log(nbExpected);
                    return nbExpected * 100 / event.venue.capacity;
                }
            }
        })
    })
;

let booking = new graphql.GraphQLObjectType({
    name: 'Booking',
    fields: () => ({
        _id: {
            type: graphql.GraphQLID
        },
        firstName: {
            type: graphql.GraphQLString
        },
        lastName: {
            type: graphql.GraphQLString
        },
        phone: {
            type: graphql.GraphQLString
        },
        email: {
            type: graphql.GraphQLString
        },
        nbExpected: {
            type: graphql.GraphQLInt
        },
        event: {
            type: event
        },
        subscribeDate: {
            type: graphql.GraphQLFloat
        },
        showedUp: {
            type: graphql.GraphQLBoolean
        },
        subscribedToNewsletter: {
            type: graphql.GraphQLBoolean
        },
    })
});


let venue = new graphql.GraphQLObjectType({
    name: 'Venue',
    fields: () => ({
        _id: {
            type: graphql.GraphQLID
        },
        name: {
            type: graphql.GraphQLString
        },
        address: {
            type: graphql.GraphQLString
        },
        city: {
            type: graphql.GraphQLString
        },
        phone: {
            type: graphql.GraphQLString
        },
        website: {
            type: graphql.GraphQLString
        },
        image: {
            type: graphql.GraphQLString
        },
        capacity: {
            type: graphql.GraphQLInt
        },
        events: {
            type: new graphql.GraphQLList(event)
        },
    })
});

module.exports = {
    booking,
    venue,
    event
};
