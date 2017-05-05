/*jshint esversion: 6 */

let express = require('express');
let graphqlHTTP = require('express-graphql');
let graphql = require('graphql');
let queryType = require('./graphql/queryType');
let {mutationType} = require('./graphql/mutationType');
let {databaseUrl} = require('./constants/constants');
let mongoose = require('mongoose');

mongoose.connect(databaseUrl);

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

