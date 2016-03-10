export function fetchComponentDataBeforeRender(dispatch, components, params) {
//  console.log("FETCH COMPONENT API");
//  console.log(components);
  const needs = components.reduce( (prev, current) => {
    return (current.need || [])
      .concat((current.WrappedComponent ? current.WrappedComponent.need : []) || [])
      .concat(prev);
    }, []);
    const promises = needs.map(need => dispatch(need(params)));
//  console.log("FETCH COMPONENT API");
//  console.log(promises);
    return Promise.all(promises);
}