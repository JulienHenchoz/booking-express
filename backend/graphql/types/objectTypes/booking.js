/*jshint esversion: 6 */

let graphql = require('graphql');
let eventType = require('./event');

let bookingType = new graphql.GraphQLObjectType({
    name: 'Booking',
    fields: function() {
        return {
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
/*            event: {
                type: eventType
            },*/
            subscribeDate: {
                type: graphql.GraphQLInt
            },
            showedUp: {
                type: graphql.GraphQLBoolean
            },
            subscribedToNewsletter: {
                type: graphql.GraphQLBoolean
            },
        };
    }
});

module.exports = bookingType;
