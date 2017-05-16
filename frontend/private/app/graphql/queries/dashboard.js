import gql from 'graphql-tag';

export const getDashboard = gql`
    query getDashboard {
      getDashboard {
        incomingEvents
        totalBookings
        totalPersons
        averageFillingPercentage
        latestBookings {
            _id
            firstName
            lastName
            nbExpected
            subscribeDate
            event {
                _id
                name
                startDate
            }
        }
      }
    }
`;
