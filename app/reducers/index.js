import { combineReducers } from 'redux';
import user from 'reducers/user';
import { postsByPort, postOpen } from 'reducers/posts';
import emailSignUp from 'reducers/emailsignup';
import locallogin from 'reducers/locallogin';
import ui from 'reducers/ui';
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  emailSignUp,
  locallogin,
  postsByPort,
  postOpen,
  ui,
  routing
});

export default rootReducer;


