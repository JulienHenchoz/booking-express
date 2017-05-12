/*jshint esversion: 6 */

let graphql = require('graphql');
let eventInputType = require('./event');

let bookingInputType = new graphql.GraphQLInputObjectType({
    name: 'BookingInput',
    fields: function() {
        return {
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
                type: eventInputType,
            }
        };
    }
});

module.exports = bookingInputType;