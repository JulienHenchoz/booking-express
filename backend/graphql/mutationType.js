/*jshint esversion: 6 */

let graphql = require('graphql');
let {venueInputType} = require('./types/inputTypes/venue');
let {venueType} = require('./types/objectTypes/venue');
let venueSchema = require('../schemas/venue');
let mongoose = require('mongoose');

let mutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            createVenue: {
                type: venueType,
                args: {
                    venue: {
                        type: new graphql.GraphQLNonNull(venueInputType)
                    }
                },
                resolve: function (value, args) {
                    let Venue = mongoose.model('Venue', venueSchema);
                    console.log('Inserted venue in DB');
                    let venue = new Venue(args.venue);
                    return venue.save();
                }
            }
        };
    }
});

module.exports = {
    mutationType
};