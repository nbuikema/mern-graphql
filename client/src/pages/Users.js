import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_USERS } from '../graphql/queries';

import UserCard from '../components/UserCard';

const Users = () => {
  const { data, loading } = useQuery(GET_ALL_USERS);

  return loading ? (
    <p className="p-5">Loading...</p>
  ) : (
    <div className="container">
      <div className="row p-5">
        {data &&
          data.allUsers.map((user) => (
            <div key={user.username} className="col-md-4">
              <UserCard user={user} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Users;
