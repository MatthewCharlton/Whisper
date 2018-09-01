const store = data => {
  prevState = prevState || {};
  newState = Object.assign(prevState, data, {});
  prevState = newState;
  return newState;
};
export default store;
