import { gql } from 'apollo-boost';

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
