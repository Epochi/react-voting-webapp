import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from 'reducers';
import promiseMiddleware from 'api/promiseMiddleware';
import createLogger from 'redux-logger';

/*
 * @param {Object} initial state to bootstrap our stores with for server-side rendering
 * @param {History Object} a history object. We use `createMemoryHistory` for server-side rendering,
 *                          while using browserHistory for client-side
 *                          rendering.
 */
export default function configureStore(initialState, history,client) {
  
  
  
  let middleware = [ promiseMiddleware(client) ];
  // Installs hooks that always keep react-router and redux
  // store in sync
  const reactRouterReduxMiddleware = routerMiddleware(history);
  if (__DEV__) {
    middleware.push(reactRouterReduxMiddleware, createLogger());
  } else {
    middleware.push(reactRouterReduxMiddleware);
  }

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
  )
);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextReducer = require('reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
