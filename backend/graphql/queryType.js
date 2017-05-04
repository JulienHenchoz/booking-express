/*jshint esversion: 6 */
let graphql = require('graphql');
let { venueType } = require('./types/objectTypes/venue');

let queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            venues: {
                type: new graphql.GraphQLList(venueType),
                resolve: function () {
                    return [
                        {
                            id: 1,
                            name: 'Le Saltimbanque',
                            capacity: 40,
                            address: 'Rue des Grottes',
                            city: 'Genève'
                        }
                    ];
                }
            }
        };
    }
});

module.exports = {
    queryType
};