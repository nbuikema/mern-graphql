import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation } from '@apollo/react-hooks';
import omitDeep from 'omit-deep';
import { USER_UPDATE } from '../../graphql/mutations';
import { PROFILE } from '../../graphql/queries';

import UserProfile from '../../components/forms/UserProfile';
import FileUpload from '../../components/FileUpload';

const Profile = () => {
  const [user, setUser] = useState({
    username: '',
    name: '',
    email: '',
    about: '',
    createdAt: '',
    updatedAt: '',
    images: []
  });
  const { username, name, about, images } = user;
  const [loading, setLoading] = useState(false);
  const { data } = useQuery(PROFILE);

  useMemo(() => {
    if (data) {
      const {
        username,
        name,
        email,
        about,
        createdAt,
        updatedAt,
        images
      } = data.profile;
      setUser({
        username,
        name,
        email,
        about,
        createdAt,
        updatedAt,
        images: omitDeep(images, ['__typename'])
      });
    }
  }, [data]);

  const [userUpdate] = useMutation(USER_UPDATE, {
    update: ({ data }) => {
      console.log(data);
      toast.success('Profile updated.');
    }
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    userUpdate({ variables: { input: { name, username, about, images } } });
    setLoading(false);
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-12 pb-3">
          <h4>{loading ? 'Loading...' : 'Profile'}</h4>
        </div>
        <FileUpload setValues={setUser} setLoading={setLoading} values={user} />
        <UserProfile
          {...user}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Profile;
