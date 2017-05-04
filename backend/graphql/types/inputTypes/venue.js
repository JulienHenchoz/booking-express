/*jshint esversion: 6 */

let graphql = require('graphql');

let venueInputType = new graphql.GraphQLInputObjectType({
    name: 'VenueInput',
    fields: function() {
        return {
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
            },
        };
    }
});

module.exports = {
    venueInputType
};