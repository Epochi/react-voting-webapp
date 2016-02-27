import { combineReducers } from 'redux';
import user from 'reducers/user';
import topic from 'reducers/topic';
import emailSignUp from 'reducers/emailsignup';
import locallogin from 'reducers/locallogin';
import { routeReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  emailSignUp,
  topic,
  routing,
  locallogin
});

export default rootReducer;
