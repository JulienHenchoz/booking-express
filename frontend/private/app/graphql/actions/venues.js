import ApolloClient, {createNetworkInterface} from 'apollo-client';
import gql from 'graphql-tag';
import * as venueQueries from '../queries/venues';

import client from '../client';

/**
 * Returns the list of venues
 * @param success
 * @param error
 */
export function getVenues(success, error) {
    client.query({
        // Always fetch the list from server, never use cache
        fetchPolicy: 'network-only',
        query: venueQueries.getVenues,
    })
        .then(success)
        .catch(error);
}

/**
 * Returns the list of venues
 * @param venueId
 * @param success
 * @param error
 */
export function getVenue(venueId, success, error) {
    client.query({
        variables: {venueId: venueId},
        query: venueQueries.getVenue,
    })
        .then(success)
        .catch(error);
}

/**
 *
 * Creates a venue
 * @param venue
 * @param success
 * @param error
 */
export function createVenue(venue, success, error) {
    client.mutate({
        variables: {venue: venue},
        mutation: venueQueries.createVenue,
        update: (store, { data: { createVenue } }) => {
            console.log(createVenue);
            /*
             // Read the data from our cache for this query.
             let data = store.readQuery({
             query: venueQueries.getVenue,
             variables: {venueId: venueId},
             });

             data.getVenue = Object.assign({}, editVenue);
             // Write our data back to the cache.
             store.writeQuery({
             query: venueQueries.getVenue, data,
             variables: {venueId: venueId},
             });*/
        },
        refetchQueries: [{
            query: venueQueries.getVenues
        }]
    })
        .then(success)
        .catch(error);
}

/**
 *
 * Edits a venue
 * @param venueId
 * @param venue
 * @param success
 * @param error
 */
export function editVenue(venueId, venue, success, error) {
    client.mutate({
        variables: {venueId: venueId, venue: venue},
        mutation: venueQueries.editVenue,
        update: (store, { data: { editVenue } }) => {
            // Read the data from our cache for this query.
            let data = store.readQuery({
                query: venueQueries.getVenue,
                variables: {venueId: venueId},
            });

            data.getVenue = Object.assign({}, editVenue);
            // Write our data back to the cache.
            store.writeQuery({
                query: venueQueries.getVenue, data,
                variables: {venueId: venueId},
            });
        },
        refetchQueries: [{
            query: venueQueries.getVenues
        }]
    })
        .then(success)
        .catch(error);
}

/**
 *
 * Edits a venue
 * @param venueId
 * @param success
 * @param error
 */
export function removeVenue(venueId, success, error) {
    client.mutate({
        variables: {venueId: venueId},
        mutation: venueQueries.removeVenue,
        refetchQueries: [{
            query: venueQueries.getVenues
        }]
    })
        .then(success)
        .catch(error);
}
