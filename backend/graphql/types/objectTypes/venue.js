/*jshint esversion: 6 */

let graphql = require('graphql');

let venueType = new graphql.GraphQLObjectType({
    name: 'Venue',
    fields: function() {
        return {
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
        };
    }
});

module.exports = venueType;