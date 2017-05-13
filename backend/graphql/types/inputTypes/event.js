/*jshint esversion: 6 */

let graphql = require('graphql');
let venueInputType = require('./venue');

let eventInputType = new graphql.GraphQLInputObjectType({
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

module.exports = eventInputType;
