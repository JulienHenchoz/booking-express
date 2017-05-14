import ApolloClient, {createNetworkInterface} from 'apollo-client';
import gql from 'graphql-tag';
import * as eventQueries from '../queries/events';

import client from '../client';

/**
 * Returns the list of events
 * @param success
 * @param error
 */
export function getEvents(success, error) {
    client.query({
        // Always fetch the list from server, never use cache
        fetchPolicy: 'network-only',
        query: eventQueries.getEvents,
    })
        .then(success)
        .catch(error);
}

/**
 * Returns the list of events
 * @param success
 * @param error
 */
export function getPastEvents(success, error) {
    client.query({
        // Always fetch the list from server, never use cache
        fetchPolicy: 'network-only',
        query: eventQueries.getPastEvents,
    })
        .then(success)
        .catch(error);
}



/**
 * Returns the list of events
 * @param eventId
 * @param success
 * @param error
 */
export function getEvent(eventId, success, error) {
    client.query({
        variables: {eventId: eventId},
        query: eventQueries.getEvent,
    })
        .then(success)
        .catch(error);
}

/**
 * Returns the list of events
 * @param eventId
 * @param success
 * @param error
 */
export function getEventWithBookings(eventId, success, error) {
    client.query({
        fetchPolicy: 'network-only',
        variables: {eventId: eventId},
        query: eventQueries.getEventWithBookings,
    })
        .then(success)
        .catch(error);
}


/**
 * Returns the list of events
 * @param eventId
 * @param success
 * @param error
 */
export function getEventForEditForm(eventId, success, error) {
    client.query({
        fetchPolicy: 'network-only',
        variables: {eventId: eventId},
        query: eventQueries.getEventForEditForm,
    })
        .then(success)
        .catch(error);
}



/**
 *
 * Creates a event
 * @param event
 * @param success
 * @param error
 */
export function createEvent(event, success, error) {
    client.mutate({
        variables: {event: event},
        mutation: eventQueries.createEvent,
        refetchQueries: [{
            query: eventQueries.getEvents
        }]
    })
        .then(success)
        .catch(error);
}

/**
 *
 * Edits a event
 * @param eventId
 * @param event
 * @param success
 * @param error
 */
export function editEvent(eventId, event, success, error) {
    client.mutate({
        variables: {eventId: eventId, event: event},
        mutation: eventQueries.editEvent,
        update: (store, { data: { editEvent } }) => {
            // Read the data from our cache for this query.
            let data = store.readQuery({
                query: eventQueries.getEvent,
                variables: {eventId: eventId},
            });

            data.getEvent = Object.assign({}, editEvent);
            // Write our data back to the cache.
            store.writeQuery({
                query: eventQueries.getEvent, data,
                variables: {eventId: eventId},
            });
        },
        refetchQueries: [{
            query: eventQueries.getEvents
        }]
    })
        .then(success)
        .catch(error);
}

/**
 *
 * Edits a event
 * @param eventId
 * @param success
 * @param error
 */
export function removeEvent(eventId, success, error) {
    client.mutate({
        variables: {eventId: eventId},
        mutation: eventQueries.removeEvent,
        refetchQueries: [{
            query: eventQueries.getEvents
        }]
    })
        .then(success)
        .catch(error);
}
