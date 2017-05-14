import gql from 'graphql-tag';

const editableFieldsFragment = gql`
    fragment EditableFields on Event {
        _id
        name
        startDate
        description
        venue {
            _id
            name
        }
    }`;


const eventsBasicInfoFragment = gql`
    fragment EventsBasicInfo on Event {
        ...EditableFields
        nbExpected
        nbBookings
        seatsLeft
        occupancyPercentage
    }
    ${editableFieldsFragment}
    `;

export const getEventForEditForm = gql`
    query getEvent($eventId: ID!) {
      getEvent(eventId: $eventId) {
        ...EditableFields
      }
    }
    ${editableFieldsFragment}
`;

export const getEvent = gql`
    query getEvent($eventId: ID!) {
      getEvent(eventId: $eventId) {
        ...EventsBasicInfo
      }
    }
    ${eventsBasicInfoFragment}
`;

export const getEventWithBookings = gql`
    query getEvent($eventId: ID!) {
      getEvent(eventId: $eventId) {
        ...EventsBasicInfo
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
    ${eventsBasicInfoFragment}
`;

export const getEvents = gql`
    query getEvents {
      getEvents {
        ...EventsBasicInfo
      }
    }
    ${eventsBasicInfoFragment}
`;

export const getPastEvents = gql`
    query getPastEvents {
      getPastEvents {
        ...EventsBasicInfo
      }
    }
    ${eventsBasicInfoFragment}
`;


export const createEvent = gql`
    mutation createEvent($event: EventInput!) {
      createEvent(event: $event) {
        ...EventsBasicInfo
      }
    }
    ${eventsBasicInfoFragment}
`;

export const editEvent = gql`
    mutation editEvent($eventId: ID!, $event: EventInput!) {
      editEvent(eventId: $eventId, event: $event) {
        ...EventsBasicInfo
      }
    }
    ${eventsBasicInfoFragment}
`;

export const removeEvent = gql`
    mutation removeEvent($eventId: ID!) {
      removeEvent(eventId: $eventId) {
        _id
        name
      }
    }
`;
