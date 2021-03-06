import React, { useContext, useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

import LoadingToRedirect from './LoadingToRedirect';

const PrivateRoute = ({ ...rest }) => {
  const { state } = useContext(AuthContext);
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (state.user) {
      setUser(true);
    }
  }, [state.user]);

  const navLinks = () => (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/password/update" className="nav-link">
            Password
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/post/create" className="nav-link">
            Post
          </Link>
        </li>
      </ul>
    </nav>
  );

  const renderContent = () => (
    <div className="container-fluid pt-5">
      <div className="row">
        <div className="col-md-2">{navLinks()}</div>
        <div className="col-md-10">{<Route {...rest} />}</div>
      </div>
    </div>
  );

  return user ? renderContent() : <LoadingToRedirect path="/login" />;
};

export default PrivateRoute;
