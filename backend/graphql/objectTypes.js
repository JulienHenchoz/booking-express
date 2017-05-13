/*jshint esversion: 6 */

let graphql = require('graphql');

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
            type: graphql.GraphQLInt
        },
        showedUp: {
            type: graphql.GraphQLBoolean
        },
        subscribedToNewsletter: {
            type: graphql.GraphQLBoolean
        },
    })
});

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
            type: graphql.GraphQLInt
        },
        description: {
            type: graphql.GraphQLString
        },
        venue: {
            type: venue
        },
        bookings: {
            type: new graphql.GraphQLList(booking)
        }
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
