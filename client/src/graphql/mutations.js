import { gql } from 'apollo-boost';
import { POST_DATA } from './fragments';

export const USER_UPDATE = gql`
  mutation userUpdate($input: UserUpdateInput!) {
    userUpdate(input: $input) {
      name
      username
      about
      images {
        url
        public_id
      }
    }
  }
`;

export const POST_CREATE = gql`
  mutation postCreate($input: PostCreateInput!) {
    postCreate(input: $input) {
      ...postData
    }
  }
  ${POST_DATA}
`;

export const POST_DELETE = gql`
  mutation postDelete($postId: String!) {
    postDelete(postId: $postId) {
      _id
    }
  }
`;

export const POST_UPDATE = gql`
  mutation postUpdate($input: PostUpdateInput!) {
    postUpdate(input: $input) {
      ...postData
    }
  }
  ${POST_DATA}
`;
