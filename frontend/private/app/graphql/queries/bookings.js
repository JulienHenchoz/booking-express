import gql from 'graphql-tag';

const fragments = {
    bookingsBasicInfo: gql`
    fragment BookingsBasicInfo on Booking {
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
        ...BookingsBasicInfo
      }
    }
    ${fragments.bookingsBasicInfo}
`;

export const getBookings = gql`
    query getBookings {
      getBookings {
        ...BookingsBasicInfo
      }
    }
    ${fragments.bookingsBasicInfo}
`;


export const getBookingsForEvent = gql`
    query getBookingsForEvent($eventId: ID!) {
      getBookingsForEvent(eventId: $eventId) {
        ...BookingsBasicInfo
      }
    }
    ${fragments.bookingsBasicInfo}
`;

export const createBooking = gql`
    mutation createBooking($booking: BookingInput!) {
      createBooking(booking: $booking) {
        ...BookingsBasicInfo
      }
    }
    ${fragments.bookingsBasicInfo}
`;

export const changeBookingStatus = gql`
    mutation changeBookingStatus($bookingId: ID!) {
      changeBookingStatus(bookingId: $bookingId) {
        ...BookingsBasicInfo
      }
    }
    ${fragments.bookingsBasicInfo}
`;

export const editBooking = gql`
    mutation editBooking($bookingId: ID!, $booking: BookingInput!) {
      editBooking(bookingId: $bookingId, booking: $booking) {
        ...BookingsBasicInfo
      }
    }
    ${fragments.bookingsBasicInfo}
`;

export const removeBooking = gql`
    mutation removeBooking($bookingId: ID!) {
      removeBooking(bookingId: $bookingId) {
        ...BookingsBasicInfo
      }
    }
    ${fragments.bookingsBasicInfo}
`;
