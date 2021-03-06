import React, { useContext } from 'react';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider } from '@apollo/react-hooks';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './context/authContext';

import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import Nav from './components/Nav';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CompleteRegistration from './pages/auth/CompleteRegistration';
import PasswordUpdate from './pages/auth/PasswordUpdate';
import PasswordForgot from './pages/auth/PasswordForgot';
import Profile from './pages/auth/Profile';
import Post from './pages/post/Post';
import PostUpdate from './pages/post/PostUpdate';
import SinglePost from './pages/post/SinglePost';
import Users from './pages/Users';
import SingleUser from './pages/SingleUser';
import SearchResults from './pages/SearchResults';

const App = () => {
  const {
    state: { user }
  } = useContext(AuthContext);

  const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_GRAPHQL_WS_ENDPOINT,
    options: {
      reconnect: true
    }
  });

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
  });

  const authLink = setContext(() => {
    return {
      headers: {
        authtoken: user ? user.token : ''
      }
    };
  });

  const httpAuthLink = authLink.concat(httpLink);

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpAuthLink
  );

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
  });

  /*
  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    request: (operation) => {
      operation.setContext({
        headers: {
          authtoken: user ? user.token : ''
        }
      });
    }
  });
  */

  return (
    <ApolloProvider client={client}>
      <Nav />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search/:query" component={SearchResults} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/user/:username" component={SingleUser} />
        <PublicRoute exact path="/register" component={Register} />
        <PublicRoute
          exact
          path="/complete-registration"
          component={CompleteRegistration}
        />
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/password/forgot" component={PasswordForgot} />
        <PrivateRoute
          exact
          path="/password/update"
          component={PasswordUpdate}
        />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/post/create" component={Post} />
        <PrivateRoute
          exact
          path="/post/update/:postid"
          component={PostUpdate}
        />
        <PrivateRoute exact path="/post/:postid" component={SinglePost} />
      </Switch>
    </ApolloProvider>
  );
};

export default App;
