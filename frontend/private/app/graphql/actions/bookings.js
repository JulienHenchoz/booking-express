import ApolloClient, {createNetworkInterface} from 'apollo-client';
import gql from 'graphql-tag';
import * as bookingQueries from '../queries/bookings';
import * as eventQueries from '../queries/events';

import client from '../client';

/**
 * Returns the list of bookings
 * @param success
 * @param error
 */
export function getBookings(success, error) {
    client.query({
        // Always fetch the list from server, never use cache
        fetchPolicy: 'network-only',
        query: bookingQueries.getBookings,
    })
        .then(success)
        .catch(error);
}

/**
 * Changes the status of a booking
 * @param bookingId
 * @param success
 * @param error
 */
export function changeBookingStatus(bookingId, eventId, success, error) {
    client.mutate({
        variables: {bookingId: bookingId},
        mutation: bookingQueries.changeBookingStatus,

        refetchQueries: [{
            query: eventQueries.getEventWithBookings,
            variables: {eventId: eventId}
        }]
    })
        .then(success)
        .catch(error);
}


/**
 * Returns the list of bookings for the given event
 * @param success
 * @param error
 */
export function getBookingsForEvent(eventId, success, error) {
    client.query({
        variables: { eventId: eventId },
        // Always fetch the list from server, never use cache
        fetchPolicy: 'network-only',
        query: bookingQueries.getBookingsForEvent,
    })
        .then(success)
        .catch(error);
}


/**
 * Returns the list of bookings
 * @param bookingId
 * @param success
 * @param error
 */
export function getBooking(bookingId, success, error) {
    client.query({
        variables: {bookingId: bookingId},
        query: bookingQueries.getBooking,
    })
        .then(success)
        .catch(error);
}

/**
 *
 * Creates a booking
 * @param booking
 * @param success
 * @param error
 */
export function createBooking(booking, success, error) {
    client.mutate({
        variables: {booking: booking},
        mutation: bookingQueries.createBooking,
        refetchQueries: [{
            query: bookingQueries.getBookings
        }]
    })
        .then(success)
        .catch(error);
}

/**
 *
 * Edits a booking
 * @param bookingId
 * @param booking
 * @param success
 * @param error
 */
export function editBooking(bookingId, booking, success, error) {
    client.mutate({
        variables: {bookingId: bookingId, booking: booking},
        mutation: bookingQueries.editBooking,
        update: (store, { data: { editBooking } }) => {
            // Read the data from our cache for this query.
            let data = store.readQuery({
                query: bookingQueries.getBooking,
                variables: {bookingId: bookingId},
            });

            data.getBooking = Object.assign({}, editBooking);
            // Write our data back to the cache.
            store.writeQuery({
                query: bookingQueries.getBooking, data,
                variables: {bookingId: bookingId},
            });
        },
        refetchQueries: [{
            query: bookingQueries.getBookings
        }]
    })
        .then(success)
        .catch(error);
}

/**
 *
 * Edits a booking
 * @param bookingId
 * @param success
 * @param error
 */
export function removeBooking(bookingId, success, error) {
    client.mutate({
        variables: {bookingId: bookingId},
        mutation: bookingQueries.removeBooking,
        refetchQueries: [{
            query: bookingQueries.getBookings
        }]
    })
        .then(success)
        .catch(error);
}
