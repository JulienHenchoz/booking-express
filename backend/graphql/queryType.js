/*jshint esversion: 6 */
let graphql = require('graphql');
let {venueType} = require('./types/objectTypes/venue');
let mongoose = require('mongoose');
let venueSchema = require('../schemas/venue');

let queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            venues: {
                type: new graphql.GraphQLList(venueType),
                resolve: function () {
                    let Venue = mongoose.model('Venue', venueSchema);
                    return Venue.find();
                }
            }
        };
    }
});

module.exports = {
    queryType
};