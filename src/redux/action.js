// actions/productActions.js
export const setProducts = (products) => ({
  type: 'SET_PRODUCTS',
  payload: products,
});

export const selectProduct = (product) => ({
  type: 'SELECT_PRODUCT',
  payload: product,
});
