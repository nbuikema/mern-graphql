import React, { useState } from 'react';
import { auth } from '../../firebase/firebase';
import { toast } from 'react-toastify';

import AuthForm from '../../components/forms/AuthForm';

const PasswordUpdate = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    auth.currentUser
      .updatePassword(password)
      .then(() => {
        setPassword('');
        setLoading(false);
        toast.success('Password successfully updated.');
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div className="container p-5">
      <h4>{loading ? 'Loading...' : 'Update Password'}</h4>
      <AuthForm
        password={password}
        setPassword={setPassword}
        showPasswordInput={true}
        showEmailInput={false}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default PasswordUpdate;
