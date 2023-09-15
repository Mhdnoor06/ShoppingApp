// reducers/productReducer.js
import { loadProductsFromLocalStorage } from './productsAction';

const initialState = {
  products: loadProductsFromLocalStorage(),
  selectedProduct: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SELECT_PRODUCT':
      const selectedProduct = state.products.find(
        (product) => product.item.itemId === action.payload,
      );
      return {
        ...state,
        selectedProduct,
      };
    default:
      return state;
  }
};

export default productReducer;
