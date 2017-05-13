/*jshint esversion: 6 */

let graphql = require('graphql');

let booking = new graphql.GraphQLInputObjectType({
    name: 'BookingInput',
    fields: () => ({
        firstName: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        lastName: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        nbExpected: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLInt)
        },
        subscribeDate: {
            type: graphql.GraphQLInt
        },
        email: {
            type: graphql.GraphQLString
        },
        phone: {
            type: graphql.GraphQLString
        },
        subscribedToNewsletter: {
            type: graphql.GraphQLString
        },
        event: {
            type: graphql.GraphQLID
        }
    })
});

let event = new graphql.GraphQLInputObjectType({
    name: 'EventInput',
    fields: () => ({
        name: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        startDate: {
            type: graphql.GraphQLInt
        },
        description: {
            type: graphql.GraphQLString
        },
        venue: {
            type: graphql.GraphQLID
        },
    })
});

let venue = new graphql.GraphQLInputObjectType({
    name: 'VenueInput',
    fields: () => ({
        name: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
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
        }
    })
});


module.exports = {
    event,
    booking,
    venue
};
