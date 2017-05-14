import * as types from '../constants/actionTypes';
import * as ajaxRoutes from '../constants/ajaxRoutes';
import * as utils from '../utils/utils';
import l10n from '../l10n/localization';
import * as queries from '../graphql/actions/events';

export function loadingEvents() {
    return {
        type: types.LOADING_EVENTS
    };
}

export function savingEvent() {
    return {
        type: types.SAVING_EVENT
    };
}


export function cancelRemoveEvent() {
    return {
        type: types.CANCEL_REMOVE_EVENT,
    };
}

export function removingEvent() {
    return {
        type: types.REMOVING_EVENT,
    };
}

export function editEvent(property, value) {
    return {
        type: types.EDIT_EVENT,
        property: property,
        payload: value
    };
}

export function removeEvent(id) {
    return {
        type: types.REMOVE_EVENT,
        index: id
    };
}


export function receiveEvents(items) {
    return {
        type: types.RECEIVE_EVENTS,
        payload: items
    };
}

export function receivePastEvents(items) {
    return {
        type: types.RECEIVE_PAST_EVENTS,
        payload: items
    };
}

export function leaveForm() {
    return {
        type: types.LEAVE_FORM
    }
}

export function receiveEvent(item) {
    return {
        type: types.RECEIVE_EVENT,
        payload: item
    };
}

export function saveSuccess(item) {
    utils.toastSuccess(l10n.save_success);
    return {
        type: types.EVENT_SAVE_SUCCESS,
        payload: item
    };
}

export function saveError(errors) {
    utils.toastError(l10n.save_error);
    return {
        type: types.EVENT_SAVE_ERROR,
        payload: errors
    };
}

export function removeSuccess(item) {
    utils.toastSuccess(l10n.remove_success);
    return {
        type: types.EVENT_REMOVE_SUCCESS,
        payload: item
    };
}

export function removeError(errors) {
    utils.toastError(l10n.remove_error);
    return {
        type: types.EVENT_REMOVE_ERROR,
        payload: errors
    };
}

export function getError(message) {
    utils.toastError(message);
    return {
        type: types.EVENTS_GET_ERROR,
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

export function addEvent(event) {
    return dispatch => {
        dispatch(savingEvent());

        queries.createEvent(
            event,
            function (response) {
                dispatch(saveSuccess(response.data.createVenue));
            },
            function (error) {
                dispatch(saveError());
            });
    };
}

export function confirmRemoveEvent(id) {
    return dispatch => {
        dispatch(removingEvent());

        queries.removeEvent(
            id,
            function (response) {
                dispatch(removeSuccess(response.data.removeEvent));
            },
            function (error) {
                dispatch(removeError());
            });
    };
}


export function updateEvent(id, event) {
    return dispatch => {
        dispatch(savingEvent());

        delete event._id;
        delete event.__typename;
        queries.editEvent(
            id,
            event,
            function (response) {
                dispatch(saveSuccess(response.data.editEvent));
            },
            function (error) {
                dispatch(saveError());
            });
    };
}


export function fetchEvents() {
    return dispatch => {
        dispatch(loadingEvents());

        queries.getEvents(
            function (response) {
                dispatch(receiveEvents(response.data.getEvents));
            },
            function (error) {
                dispatch(getError(l10n.events_fetch_error));
            });
    };
}

export function fetchPastEvents() {
    return dispatch => {
        dispatch(loadingEvents());

        queries.getPastEvents(
            function (response) {
                dispatch(receivePastEvents(response.data.getPastEvents));
            },
            function (error) {
                dispatch(getError(l10n.events_fetch_error));
            });
    };
}

export function fetchEvent(id) {
    return dispatch => {
        dispatch(loadingEvents());

        queries.getEvent(
            id,
            function (response) {
                dispatch(receiveEvent(response.data.getEvent));
            },
            function (error) {
                dispatch(getError(l10n.events_fetch_error));
            });
    };
}

export function fetchEventWithBookings(id) {
    return dispatch => {
        dispatch(loadingEvents());

        queries.getEventWithBookings(
            id,
            function (response) {
                dispatch(receiveEvent(response.data.getEvent));
            },
            function (error) {
                dispatch(getError(l10n.events_fetch_error));
            });
    };
}



