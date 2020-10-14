import { gql } from 'apollo-boost';

export const POST_DATA = gql`
  fragment postData on Post {
    _id
    content
    image {
      url
      public_id
    }
    postedBy {
      _id
      username
    }
  }
`;
