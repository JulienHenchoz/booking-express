import * as types from '../constants/actionTypes';
import * as ajaxRoutes from '../constants/ajaxRoutes';
import * as query from '../graphql/client.js';

import * as utils from '../utils/utils';
import l10n from '../l10n/localization';
export function loadingVenues() {
    return {
        type: types.LOADING_VENUES
    };
}

export function savingVenue() {
    return {
        type: types.SAVING_VENUE
    };
}


export function cancelRemoveVenue() {
    return {
        type: types.CANCEL_REMOVE_VENUE,
    };
}

export function removingVenue() {
    return {
        type: types.REMOVING_VENUE,
    };
}

export function editVenue(property, value) {
    return {
        type: types.EDIT_VENUE,
        property: property,
        payload: value
    };
}

export function removeVenue(id) {
    return {
        type: types.REMOVE_VENUE,
        index: id
    };
}


export function receiveVenues(items) {
    return {
        type: types.RECEIVE_VENUES,
        payload: items
    };
}

export function leaveForm() {
    return {
        type: types.LEAVE_FORM
    }
}

export function receiveVenue(item) {
    return {
        type: types.RECEIVE_VENUE,
        payload: item
    };
}

export function saveSuccess(item) {
    utils.toastSuccess(l10n.save_success);
    return {
        type: types.VENUE_SAVE_SUCCESS,
        payload: item
    };
}

export function saveError(errors) {
    utils.toastError(l10n.save_error);
    return {
        type: types.VENUE_SAVE_ERROR,
        payload: errors
    };
}

export function removeSuccess(item) {
    utils.toastSuccess(l10n.remove_success);
    return {
        type: types.VENUE_REMOVE_SUCCESS,
        payload: item
    };
}

export function removeError(errors) {
    utils.toastError(l10n.remove_error);
    return {
        type: types.VENUE_REMOVE_ERROR,
        payload: errors
    };
}

export function getError(message) {
    utils.toastError(message);
    return {
        type: types.VENUES_GET_ERROR,
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

export function addVenue(venue) {
    return dispatch => {
        dispatch(savingVenue());
        query.createVenue(
            venue,
            function (response) {
                dispatch(saveSuccess(response.data.createVenue));
            },
            function (error) {
                dispatch(saveError());
            });
    };
}

export function confirmRemoveVenue(id) {
    return dispatch => {
        dispatch(removingVenue());

        query.removeVenue(
            id,
            function (response) {
                dispatch(removeSuccess(response.data.editVenue));
            },
            function (error) {
                dispatch(removeError());
            });
    };
}


export function updateVenue(id, venue) {
    return dispatch => {
        dispatch(savingVenue());

        delete venue._id;
        delete venue.__typename;
        query.editVenue(
            id,
            venue,
            function (response) {
                dispatch(saveSuccess(response.data.editVenue));
            },
            function (error) {
                dispatch(saveError());
            });
    };
}


export function fetchVenues() {
    return dispatch => {
        dispatch(loadingVenues());
        query.getVenues(
            function (response) {
                dispatch(receiveVenues(response.data.getVenues));
            },
            function (error) {
                dispatch(getError(l10n.venues_fetch_error));
            });
    };
}

export function fetchVenue(id) {
    return dispatch => {
        dispatch(loadingVenues());

        query.getVenue(
            id,
            function (response) {
                dispatch(receiveVenue(response.data.getVenue));
            },
            function (error) {
                dispatch(getError(l10n.venues_fetch_error));
            });
    };
}

