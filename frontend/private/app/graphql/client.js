import ApolloClient, {createNetworkInterface} from 'apollo-client';
import gql from 'graphql-tag';

const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: 'http://backend/',
    }),
});

export function getVenues(success, error) {
    client.query({
        query: gql`
    query TodoApp {
      todos {
        id
        text
        completed
      }
    }
  `,
    })
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

