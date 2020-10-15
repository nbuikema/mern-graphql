import { gql } from 'apollo-boost';
import { POST_DATA } from './fragments';

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
  query allPosts($page: Int) {
    allPosts(page: $page) {
      ...postData
    }
  }
  ${POST_DATA}
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

export const POSTS_BY_USER = gql`
  query {
    postsByUser {
      ...postData
    }
  }
  ${POST_DATA}
`;

export const SINGLE_POST = gql`
  query singlePost($postId: String!) {
    singlePost(postId: $postId) {
      ...postData
    }
  }
  ${POST_DATA}
`;

export const TOTAL_POSTS = gql`
  query {
    totalPosts
  }
`;

export const SEARCH = gql`
  query search($query: String!) {
    search(query: $query) {
      ...postData
    }
  }
  ${POST_DATA}
`;
