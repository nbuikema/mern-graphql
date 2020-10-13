import { gql } from 'apollo-boost';

export const PROFILE = gql`
  query {
    profile {
      _id
      name
      username
      email
      about
      createdAt
      updatedAt
      images {
        url
        public_id
      }
    }
  }
`;
