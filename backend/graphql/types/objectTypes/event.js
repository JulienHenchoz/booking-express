/*jshint esversion: 6 */

let graphql = require('graphql');
let venueType = require('./venue');
let bookingType = require('./booking');

let eventType = new graphql.GraphQLObjectType({
    name: 'Event',
    fields: function() {
        return {
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
                type: venueType
            },
            bookings: {
                type: new graphql.GraphQLList(bookingType)
            }
        };
    }
});

module.exports = eventType;