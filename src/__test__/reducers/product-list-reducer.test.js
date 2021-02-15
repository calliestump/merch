import productListReducer from '../../reducers/product-list-reducer';

describe('productListReducer', () => {
  let action;
  const productData = {
    name: 'T-Shirt',
    location: '4a',
    quantity: 4,
    id: 1
  }

  const currentState = {
    1: {
      name: 'T-shirt',
      location: '4a',
      quantity: 4,
      id: 1
    },
    2: {
      name: 'Jacket',
      location: '3a',
      quantity: 7,
      id: 2
    }
  }

  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(productListReducer({}, { type: null })).toEqual({});
  });

  test('Should successfully add new product data to masterProductList', () => {
    const { name, location, quantity, id } = productData;
    action = {
      type: 'ADD_PRODUCT',
      name: name,
      location: location,
      quantity: quantity,
      id: id
    };
    expect(productListReducer({}, action)).toEqual({
      [id]: {
        name: name,
        location: location,
        quantity: quantity,
        id: id
      }
    });
  });

  test('Should successfully delete a ticket', () => {
    action = {
      type: 'DELETE_PRODUCT',
      id: 1
    };
    expect(productListReducer(currentState, action)).toEqual({
      2: {
        name: 'Jacket',
        location: '3a',
        quantity: 7,
        id: 2
      }
    });
  });
  
});

