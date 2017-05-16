import * as types from '../constants/actionTypes';
import * as ajaxRoutes from '../constants/ajaxRoutes';
import * as queries from '../graphql/actions/dashboard';

import * as utils from '../utils/utils';
import l10n from '../l10n/localization';

export function loadingDashboard() {
    return {
        type: types.LOADING_DASHBOARD
    };
}

export function receiveDashboard(data) {
    return {
        type: types.RECEIVE_DASHBOARD,
        payload: data
    };
}

export function getError(message) {
    utils.toastError(message);
    return {
        type: types.DASHBOARD_GET_ERROR,
        payload: message
    };
}
export function fetchDashboard() {
    return dispatch => {
        dispatch(loadingDashboard());
        queries.getDashboard(
            function (response) {
                dispatch(receiveDashboard(response.data.getDashboard));
            },
            function (error) {
                console.error(error);
                dispatch(getError(l10n.dashboard_fetch_error));
            });
    };
}
