import gql from 'graphql-tag';

const fragments = {
    venuesBasicInfo: gql`
    fragment VenuesBasicInfo on Venue {
        _id
        name
        address
        city
        capacity
        phone
        website
        image
    }
  `
};

export const getVenue = gql`
    query getVenue($venueId: ID!) {
      getVenue(venueId: $venueId) {
        ...VenuesBasicInfo
      }
    }
    ${fragments.venuesBasicInfo}
`;

export const getVenues = gql`
    query getVenues {
      getVenues {
        ...VenuesBasicInfo
      }
    }
    ${fragments.venuesBasicInfo}
`;

export const createVenue = gql`
    mutation createVenue($venue: VenueInput!) {
      createVenue(venue: $venue) {
        ...VenuesBasicInfo
      }
    }
    ${fragments.venuesBasicInfo}
`;

export const editVenue = gql`
    mutation editVenue($venueId: ID!, $venue: VenueInput!) {
      editVenue(venueId: $venueId, venue: $venue) {
        ...VenuesBasicInfo
      }
    }
    ${fragments.venuesBasicInfo}
`;

export const removeVenue = gql`
    mutation removeVenue($venueId: ID!) {
      removeVenue(venueId: $venueId) {
        ...VenuesBasicInfo
      }
    }
    ${fragments.venuesBasicInfo}
`;
