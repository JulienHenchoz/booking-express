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

app.use('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use('/', graphqlHTTP({
        schema: schema,
        graphiql: true,
    })
);
app.listen(4000, () => console.log('Now browse to localhost:4000'));

