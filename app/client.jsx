import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createRoutes from 'routes.jsx';
import configureStore from 'store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import createBrowserHistory from 'history/lib/createBrowserHistory'

// Grab the state from a global injected into
// server-generated HTML
const initialState = window.__INITIAL_STATE__;
const history = createBrowserHistory();
const store = configureStore(initialState);
const routes = createRoutes(store);

// Router converts <Route> element hierarchy to a route config:
// Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>, document.getElementById('app'));


