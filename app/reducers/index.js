import { combineReducers } from 'redux';
import user from 'reducers/user';
import posts from 'reducers/posts';
import emailSignUp from 'reducers/emailsignup';
import locallogin from 'reducers/locallogin';
import ui from 'reducers/ui';
import { routeReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  emailSignUp,
  posts,
  routing,
  locallogin,
  ui
});

export default rootReducer;
