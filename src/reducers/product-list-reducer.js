export default (state = {}, action) => {
  const { name, location, quantity, id } = action;
  switch (action.type) {
  case 'ADD_PRODUCT':
    return Object.assign({}, state, {
      [id]: {
        name: name,
        location: location,
        quantity: quantity,
        id: id
      }
    });
  default:
    return state;
  }
};