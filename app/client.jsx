import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createRoutes from 'routes.jsx';
import configureStore from 'store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
//import createDevToolsWindow from 'createDevToolsWindow';
import ApiClient from 'api/ApiClient.js';
injectTapEventPlugin();

// Grab the state from a global injected into
// server-generated HTML
const initialState = window.__INITIAL_STATE__;

const client = ApiClient();
const store = configureStore(initialState, browserHistory,client);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);

// Router converts <Route> element hierarchy to a route config:
// Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>, document.getElementById('app'));
  
