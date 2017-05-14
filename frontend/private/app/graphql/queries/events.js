import gql from 'graphql-tag';

const fragments = {
    basicInfo: gql`
    fragment BasicInfo on Event {
        _id
        name
        startDate
        nbExpected
        nbBookings
        venue {
            _id
            name
        }
    }
  `
};

export const getEvent = gql`
    query getEvent($eventId: ID!) {
      getEvent(eventId: $eventId) {
        ...BasicInfo
      }
    }
    ${fragments.basicInfo}
`;

export const getEventWithBookings = gql`
    query getEvent($eventId: ID!) {
      getEvent(eventId: $eventId) {
        ...BasicInfo
        bookings {
            _id
            firstName
            lastName
            email
            nbExpected
            showedUp
            subscribedToNewsletter
            subscribeDate
        }
      }
    }
    ${fragments.basicInfo}
`;

export const getEvents = gql`
    query getEvents {
      getEvents {
        ...BasicInfo
      }
    }
    ${fragments.basicInfo}
`;

export const getPastEvents = gql`
    query getPastEvents {
      getPastEvents {
        ...BasicInfo
      }
    }
    ${fragments.basicInfo}
`;



export const createEvent = gql`
    mutation createEvent($event: EventInput!) {
      createEvent(event: $event) {
        ...BasicInfo
      }
    }
    ${fragments.basicInfo}
`;

export const editEvent = gql`
    mutation editEvent($eventId: ID!, $event: EventInput!) {
      editEvent(eventId: $eventId, event: $event) {
        ...BasicInfo
      }
    }
    ${fragments.basicInfo}
`;

export const removeEvent = gql`
    mutation removeEvent($eventId: ID!) {
      removeEvent(eventId: $eventId) {
        ...BasicInfo
      }
    }
    ${fragments.basicInfo}
`;
