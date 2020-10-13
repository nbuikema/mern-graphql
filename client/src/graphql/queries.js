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

export const GET_ALL_POSTS = gql`
  {
    allPosts {
      id
      title
      description
    }
  }
`;

export const GET_ALL_USERS = gql`
  query {
    allUsers {
      username
      about
      images {
        url
        public_id
      }
    }
  }
`;

export const PUBLIC_PROFILE = gql`
  query publicProfile($username: String!) {
    publicProfile(username: $username) {
      name
      username
      email
      about
      createdAt
      images {
        url
        public_id
      }
    }
  }
`;
