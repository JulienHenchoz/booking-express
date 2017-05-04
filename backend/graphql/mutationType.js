/*jshint esversion: 6 */

let graphql = require('graphql');
let { venueInputType } = require('./types/inputTypes/venue');
let { venueType } = require('./types/objectTypes/venue');
let { Venue } = require('../models/venue');


let mutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            createVenue : {
                type: venueType,
                args: {
                    venue: { type: venueInputType }
                },
                resolve: function (value, args) {
                    console.log('Inserted venue in DB');
                    let venue = new Venue(args.venue);
                    console.log(venue);
                    return venue.save();
                }
            }
        };
    }
});

module.exports = {
    mutationType
};