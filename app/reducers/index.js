import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import undoable from 'redux-undo';
import user from 'reducers/user';
import { selectedPort, postsByPort } from 'reducers/posts';
import emailSignUp from 'reducers/emailsignup';
import locallogin from 'reducers/locallogin';
import ui from 'reducers/ui';

//import { routeReducer as routing } from 'react-router-redux';
// router

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user: user,
  emailSignUp: emailSignUp,
  selectedPort: undoable(selectedPort),
  postsByPort: undoable(postsByPort),
  router: routerStateReducer,
  locallogin: locallogin,
  ui: ui
});

export default rootReducer;
