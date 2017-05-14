import gql from 'graphql-tag';

const fragments = {
    basicInfo: gql`
    fragment BasicInfo on Booking {
        _id
        firstName
        lastName
        subscribeDate
        email
        nbExpected
        showedUp
        event {
            _id
            name
        }
    }
  `
};

export const getBooking = gql`
    query getBooking($bookingId: ID!) {
      getBooking(bookingId: $bookingId) {
        ...BasicInfo
      }
    }
    ${fragments.basicInfo}
`;

export const getBookings = gql`
    query getBookings {
      getBookings {
        ...BasicInfo
      }
    }
    ${fragments.basicInfo}
`;


export const getBookingsForEvent = gql`
    query getBookingsForEvent($eventId: ID!) {
      getBookingsForEvent(eventId: $eventId) {
        ...BasicInfo
      }
    }
    ${fragments.basicInfo}
`;

export const createBooking = gql`
    mutation createBooking($booking: BookingInput!) {
      createBooking(booking: $booking) {
        ...BasicInfo
      }
    }
    ${fragments.basicInfo}
`;

export const changeBookingStatus = gql`
    mutation changeBookingStatus($bookingId: ID!) {
      changeBookingStatus(bookingId: $bookingId) {
        ...BasicInfo
      }
    }
    ${fragments.basicInfo}
`;

export const editBooking = gql`
    mutation editBooking($bookingId: ID!, $booking: BookingInput!) {
      editBooking(bookingId: $bookingId, booking: $booking) {
        ...BasicInfo
      }
    }
    ${fragments.basicInfo}
`;

export const removeBooking = gql`
    mutation removeBooking($bookingId: ID!) {
      removeBooking(bookingId: $bookingId) {
        ...BasicInfo
      }
    }
    ${fragments.basicInfo}
`;
