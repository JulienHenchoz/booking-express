import gql from 'graphql-tag';

const fragments = {
    basicInfo: gql`
    fragment BasicInfo on Venue {
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
        ...BasicInfo
      }
    }
    ${fragments.basicInfo}
`;

export const getVenues = gql`
    query getVenues {
      getVenues {
        ...BasicInfo
      }
    }
    ${fragments.basicInfo}
`;

export const createVenue = gql`
    mutation createVenue($venue: VenueInput!) {
      createVenue(venue: $venue) {
        ...BasicInfo
      }
    }
    ${fragments.basicInfo}
`;

export const editVenue = gql`
    mutation editVenue($venueId: ID!, $venue: VenueInput!) {
      editVenue(venueId: $venueId, venue: $venue) {
        ...BasicInfo
      }
    }
    ${fragments.basicInfo}
`;

export const removeVenue = gql`
    mutation removeVenue($venueId: ID!) {
      removeVenue(venueId: $venueId) {
        ...BasicInfo
      }
    }
    ${fragments.basicInfo}
`;
