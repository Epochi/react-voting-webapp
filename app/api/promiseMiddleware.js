/*
* Redux middleware to handle promises
* As seen in: https://github.com/erikras/react-redux-universal-hot-example/blob/master/src/redux/middleware/clientMiddleware.js
* 
* This passes all actions with 'promise' to be used by client, which is custom axios instance
* Functions called by makeTopicRequest and makeUserRequest are working as intended, because they just don't accept 'client' as argument
*/
export default function promiseMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, type, ...rest } = action;
      if (!promise) {
        return next(action);
      }
      console.log(type);
      const SUCCESS = type + '_SUCCESS';
      const REQUEST = type + '_REQUEST';
      const FAILURE = type + '_FAILURE';
      next({...rest, type: REQUEST});
      const actionPromise = promise(client);
      actionPromise.then(req => {
        next({...rest, req, type: SUCCESS});
      }).catch((error)=> {
        console.error('MIDDLEWARE ERROR:', error);
        next({...rest, error, type: FAILURE});
      });
      
      return actionPromise;
    };
  };
}

