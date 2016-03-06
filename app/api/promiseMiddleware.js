export default function promiseMiddleware() {
  return next => action => {
    const { promise, type, ...rest } = action;
    console.log('promis middlewar')
    if (!promise) return next(action);

    const SUCCESS = type + '_SUCCESS';
    const REQUEST = type + '_REQUEST';
    const FAILURE = type + '_FAILURE';
    next({ ...rest, type: REQUEST });
    return promise
      .then(req => {
        console.log("INSIDE EMPTY PROMISES");
        console.log(req.type);
        next({ ...rest, req, type: SUCCESS });
        return true;
      })
      .catch(error => {
        next({ ...rest, error, type: FAILURE });
        return false;
      });
   };
}
