import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from 'containers/App';
import Profile from 'containers/Profile';
import Posts from 'containers/Posts';
import Post from 'containers/Post';
import {selectPort, postOpenState} from 'actions/posts';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 // Account Dashboard, Search results, User Info goes here
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };
  
  const postViewOpen = (nextState, replace, callback) => {
      store.dispatch(postOpenState(true));
      callback();
  };
  
  const selectedPort = (nextState, replace, callback) => {
      console.log('nextstate');
      console.log(nextState);
      console.log('nextstate eh');
    if(nextState.params.hasOwnProperty('subport')){
      store.dispatch(selectPort(nextState.params.subport))
      console.log('nextStore');
      console.log(store);
      console.log('nextStore eh');
    }
    callback();
  };
  
  return (
    <Route path="/" component={App} onEnter={selectedPort}>
      <IndexRoute component={Posts}/>
      <Route path="dashboard" component={Profile} onEnter={requireAuth} />
      <Route path=":subport" component={Posts} >
        <Route path=":postId" component={Post} />
      </Route>
    </Route>
  );
};

