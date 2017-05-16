import * as types from '../constants/actionTypes';
import * as ajaxRoutes from '../constants/ajaxRoutes';
import * as queries from '../graphql/actions/bookings';

import * as utils from '../utils/utils';
import l10n from '../l10n/localization';
export function loadingBookings() {
    return {
        type: types.LOADING_BOOKINGS
    };
}

export function loadingBookingsEvent() {
    return {
        type: types.LOADING_BOOKINGS_EVENT
    };
}

export function savingBooking() {
    return {
        type: types.SAVING_BOOKING
    };
}

export function cancelRemoveBooking() {
    return {
        type: types.CANCEL_REMOVE_BOOKING,
    };
}

export function removingBooking() {
    return {
        type: types.REMOVING_BOOKING,
    };
}

export function editBooking(property, value) {
    return {
        type: types.EDIT_BOOKING,
        property: property,
        payload: value
    };
}

export function removeBooking(id) {
    return {
        type: types.REMOVE_BOOKING,
        index: id
    };
}


export function receiveBookings(items) {
    return {
        type: types.RECEIVE_BOOKINGS,
        payload: items
    };
}

export function receivePastBookings(items) {
    return {
        type: types.RECEIVE_PAST_BOOKINGS,
        payload: items
    };
}

export function leaveForm() {
    return {
        type: types.LEAVE_FORM
    }
}

export function receiveBooking(item) {
    return {
        type: types.RECEIVE_BOOKING,
        payload: item
    };
}

export function saveSuccess(item) {
    utils.toastSuccess(l10n.save_success);
    return {
        type: types.BOOKING_SAVE_SUCCESS,
        payload: item
    };
}

export function saveError(errors) {
    utils.toastError(l10n.save_error);
    return {
        type: types.BOOKING_SAVE_ERROR,
        payload: errors
    };
}

export function removeSuccess(item) {
    utils.toastSuccess(l10n.remove_success);
    return {
        type: types.BOOKING_REMOVE_SUCCESS,
        payload: item
    };
}

export function removeError(errors) {
    utils.toastError(l10n.remove_error);
    return {
        type: types.BOOKING_REMOVE_ERROR,
        payload: errors
    };
}

export function getError(message) {
    utils.toastError(message);
    return {
        type: types.BOOKINGS_GET_ERROR,
        payload: message
    };
}

export function validationError(errors) {
    utils.toastError(l10n.validation_errors);
    return {
        type: types.VALIDATION_ERROR,
        payload: errors
    };
}

export function changingStatus(bookingId) {
    return {
        type: types.CHANGING_BOOKING_STATUS,
        payload: {
            bookingId: bookingId
        }
    };
}

export function changeStatusError(bookingId) {
    utils.toastError(l10n.change_booking_status_error);
    return {
        type: types.CHANGE_BOOKING_STATUS_ERROR,
        payload: {
            bookingId: bookingId
        }
    };
}

export function changeStatusSuccess(bookingId, newStatus) {
    //utils.toastSuccess(l10n.change_booking_status_success);
    return {
        type: types.CHANGE_BOOKING_STATUS_SUCCESS,
        payload: {
            bookingId: bookingId,
            newStatus: newStatus
        }
    };
}

export function changeStatus(bookingId, eventId) {
    return dispatch => {
        dispatch(changingStatus(bookingId));

        queries.changeBookingStatus(
            bookingId,
            eventId,
            function (response) {
                dispatch(changeStatusSuccess(bookingId, response.data.changeBookingStatus.showedUp));
            },
            function (error) {
                console.error(error);
                dispatch(changeStatusError(bookingId));
            });
    };
}

export function addBooking(booking) {
    return dispatch => {
        dispatch(savingBooking());

        queries.createBooking(
            booking,
            function (response) {
                dispatch(saveSuccess(response.data.createBooking));
            },
            function (error) {
                console.error(error);
                dispatch(saveError());
            });
    };
}

export function confirmRemoveBooking(id) {
    return dispatch => {
        dispatch(removingBooking());

        queries.removeBooking(
            id,
            function (response) {
                dispatch(removeSuccess(response.data.removeBooking));
            },
            function (error) {
                dispatch(removeError());
            });
    };
}


export function updateBooking(id, booking) {
    return dispatch => {
        dispatch(savingBooking());

        delete booking._id;
        delete booking.__typename;
        booking.event = booking.event._id;
        queries.editBooking(
            id,
            booking,
            function (response) {
                dispatch(saveSuccess(response.data.editBooking));
            },
            function (error) {
                console.error(error);
                dispatch(saveError());
            });
    };
}

export function fetchBookingsForEvent(eventId) {
    return dispatch => {
        dispatch(loadingBookingsEvent());

        queries.getBookingsForEvent(
            eventId,
            function (response) {
                dispatch(receiveBookingsEvent(response.data.getBookingsForEvent));
            },
            function (error) {
                dispatch(getError(l10n.bookings_event_fetch_error));
            });
    };
}

export function receiveBookingsEvent(item) {
    return {
        type: types.RECEIVE_BOOKINGS_EVENT,
        payload: item
    };
}

export function leaveBookingsList() {
    return {
        type: types.LEAVE_BOOKINGS_LIST,
    };
}

export function fetchBookings() {
    return dispatch => {
        dispatch(loadingBookings());

        queries.getBookings(
            function (response) {
                dispatch(receiveBookings(response.data.getBookings));
            },
            function (error) {
                dispatch(getError(l10n.bookings_fetch_error));
            });
    };
}

export function fetchBooking(id) {
    return dispatch => {
        dispatch(loadingBookings());

        queries.getBooking(
            id,
            function (response) {
                dispatch(receiveBooking(response.data.getBooking));
            },
            function (error) {
                dispatch(getError(l10n.booking_fetch_error));
            });
    };
}

