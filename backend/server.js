/*jshint esversion: 6 */

let express = require('express');
let graphqlHTTP = require('express-graphql');
let graphql = require('graphql');
let {queryType} = require('./graphql/queryType');
let {mutationType} = require('./graphql/mutationType');
let mongoose = require('mongoose');

mongoose.connect('mongodb://bookingapp:oLUhiMicmZLnDfxezJ2zstHA@ds131511.mlab.com:31511/booking');

let schema = new graphql.GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

let app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));

