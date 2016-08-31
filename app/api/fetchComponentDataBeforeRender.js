/**
* This looks at static needs parameter in components and waits for the promise to be fullfilled
* It is used to make sure server side rendered pages wait for APIs to resolve before returning res.end()
* As seen in: https://github.com/caljrimmer/isomorphic-redux-app
*/

export function fetchComponentDataBeforeRender(dispatch, components, params, query) {
  const needs = components.reduce( (prev, current) => {
    return (current.need || [])
      .concat((current.WrappedComponent ? current.WrappedComponent.need : []) || [])
      .concat(prev);
    }, []);
    if(Object.keys(params).length === 0){params = undefined}
    if(Object.keys(query).length === 0){query = undefined}
    console.log('fetchComponentDataBeforeRender Query and Params');
    console.dir(query);
    console.log(params);
    needs.reverse();
    console.log(needs);
    console.log('fetchComponentDataBeforeRender END');
    const promises = needs.map(need => dispatch(need(params, query)));
    return Promise.all(promises);
}