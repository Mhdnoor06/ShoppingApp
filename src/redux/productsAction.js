// Save products to local storage
export const saveProductsToLocalStorage = (products) => {
  localStorage.setItem('products', JSON.stringify(products));
};

// Load products from local storage
export const loadProductsFromLocalStorage = () => {
  const storedProducts = localStorage.getItem('products');
  return storedProducts ? JSON.parse(storedProducts) : [];
};
