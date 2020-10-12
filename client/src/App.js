import React, { useContext } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './context/authContext';

import Nav from './components/Nav';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CompleteRegistration from './pages/auth/CompleteRegistration';

const App = () => {
  const { state: { user } } = useContext(AuthContext);

  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    request: operation => {
      operation.setContext({
        headers: {
          authtoken: user ? user.token : ''
        }
      });
    }
  });

  return (
    <ApolloProvider client={ client }>
      <Nav />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route exact path='/register' component={ Register } />
        <Route exact path='/complete-registration' component={ CompleteRegistration } />
        <Route exact path='/login' component={ Login } />
      </Switch>
    </ApolloProvider>
  );
};

export default App;