/*jshint esversion: 6 */

let graphql = require('graphql');
let venueInputType = require('./venue');
let bookingInputType = require('./booking');

let eventInputType = new graphql.GraphQLInputObjectType({
    name: 'EventInput',
    fields: function() {
        return {
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
                type: venueInputType
            },
            bookings: {
                type: new graphql.GraphQLList(bookingInputType)
            },
            capacity: {
                type: graphql.GraphQLInt
            },
        };
    }
});

module.exports = eventInputType;