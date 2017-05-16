import * as dashboardQueries from '../queries/dashboard';

import client from '../client';

/**
 * Returns the dashboard data
 * @param success
 * @param error
 */
export function getDashboard(success, error) {
    client.query({
        // Always fetch the list from server, never use cache
        fetchPolicy: 'network-only',
        query: dashboardQueries.getDashboard,
    })
        .then(success)
        .catch(error);
}
