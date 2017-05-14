import ApolloClient, {createNetworkInterface} from 'apollo-client';
import gql from 'graphql-tag';
import * as venueQueries from './queries/venues';

export default new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: 'http://127.0.0.1:4000/',
    }),
});
