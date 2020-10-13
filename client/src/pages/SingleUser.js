import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { PUBLIC_PROFILE } from '../graphql/queries';
import { useParams } from 'react-router-dom';

import UserCard from '../components/UserCard';

const SingleUser = () => {
  let params = useParams();
  const { data, loading } = useQuery(PUBLIC_PROFILE, {
    variables: {
      username: params.username
    }
  });

  return loading ? (
    <p className="p-5">Loading...</p>
  ) : (
    <div className="container">
      <UserCard user={data.publicProfile} />
    </div>
  );
};

export default SingleUser;
