import productListReducer from '../../reducers/product-list-reducer';

describe('productListReducer', () => {
  let action;
  const productData = {
      name: 'T-Shirt',
      location: '4a',
      quantity: 4,
      id: 1
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
      [id] : {
        name: name,
        location: location,
        quantity: quantity,
        id: id
      }
    });
  });
});

