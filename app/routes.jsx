import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App';
import Profile from 'containers/Profile';
import Posts from 'containers/Posts';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 // Account Dashboard, Search results, User Info goes here
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    callback();
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Posts} />
      <Route path="dashboard" component={Profile} onEnter={requireAuth} />

    </Route>
  );
};

//<Route path="/user/profile" component={Profile} onEnter={requireAuth} />
