import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setProducts, setSelectProduct } from '../redux/action';
import axios from 'axios';
import Layout from './Layout';
import { saveProductsToLocalStorage } from '../redux/productsAction';
import Checkout from './Checkout';
// import { uuid } from 'uuidv4';

function Body({ products, setProducts, setSelectProduct }) {
  const [isfilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Select Filter');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleFilter = () => {
    setIsFilterOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
  };

  const handleProductSelect = (productId) => {
    setSelectProduct(productId);
  };

  // Function to add items to the cart
  // Function to add items to the cart
  const addToCart = (item) => {
    const itemIndex = cartItems.findIndex(
      (cartItem) => cartItem.items.itemId === item.item.itemId,
    );

    if (itemIndex !== -1) {
      // Item already exists in the cart; increment quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // Item doesn't exist in the cart; add a new item
      const items = item.item;
      setCartItems([...cartItems, { items, quantity: 1 }]);
    }
  };

  console.log(cartItems);
  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://aliexpress-datahub.p.rapidapi.com/item_search',
        params: {
          q: 'headphone',
          page: '1',
        },
        headers: {
          'X-RapidAPI-Key':
            'de61fc37a6msh7e351480c227941p1c8916jsn355e046976ba',
          'X-RapidAPI-Host': 'aliexpress-datahub.p.rapidapi.com',
        },
      };
      try {
        const response = await axios.request(options);
        setProducts(response.data.result.resultList);
        // Save products to local storage after setting them in the Redux store
        saveProductsToLocalStorage(response.data.result.resultList);
      } catch (error) {
        console.error(error);
      }
    };

    if (!products.length) {
      fetchData();
      console.log('Fetcjed');
    }
  }, [products]);

  return (
    <>
      <div className="header flex flex-col lg:flex-row lg:px-20 justify-between px-5 py-2 bg-green-800 text-white font-poppins font-light w-full">
        <p className="contact">
          <i className="uil uil-phone"></i> +001234567890
        </p>
        <p>Get 50% off on the selected items | Shop Now</p>
        <div className="lanLoc flex justify-between w-36 ">
          <p>
            Eng <i className="uil uil-angle-down"></i>
          </p>
          <p>
            Location <i className="uil uil-angle-down"></i>
          </p>
        </div>
      </div>
      <Layout setCheckout={setIsCheckoutOpen} />
      <div className="center 2xl:mx-32">
        <div className="img flex xl:mt-10 ">
          <img className="w-full max-sm:h-32" src="./main.png" alt="" />
        </div>
        <div className="catagory flex flex-col lg:flex-row my-10">
          <div className="xl:flex flex-col lg:flex-row md:hidden max-md:hidden">
            <p className="font-poppins border mx-1 2xl:mx-3 xl:rounded-full px-5 py-2">
              HeadPhone Type
            </p>
            <p className="font-poppins border mx-1 2xl:mx-3 xl:rounded-full px-5 py-2">
              Price <i className="uil uil-angle-down"></i>
            </p>
            <p className="font-poppins border mx-1 2xl:mx-3 xl:rounded-full px-5 py-2">
              Review <i className="uil uil-angle-down"></i>
            </p>
            <p className="font-poppins border mx-1 2xl:mx-3 xl:rounded-full px-5 py-2">
              Color <i className="uil uil-angle-down"></i>
            </p>
            <p className="font-poppins border mx-1 2xl:mx-3 xl:rounded-full px-5 py-2">
              Material <i className="uil uil-angle-down"></i>
            </p>
            <p className="font-poppins border mx-1 2xl:mx-3 xl:rounded-full px-5 py-2">
              Offer <i className="uil uil-angle-down"></i>
            </p>
          </div>
          {/* Responsive Dropdown */}
          <div className="relative xl:hidden mx-1 2xl:mx-3 xl:rounded-full px-5 py-2 border">
            <button
              onClick={toggleFilter}
              className="font-poppins w-full text-left focus:outline-none"
            >
              {selectedFilter} <i className="uil uil-angle-down"></i>
            </button>
            {isfilterOpen && (
              <div className="absolute w-full mt-2 py-1 bg-white border rounded-lg shadow-lg">
                <p
                  onClick={() => handleFilterSelect('HeadPhone Type')}
                  className="font-poppins cursor-pointer px-4 py-2 hover:bg-gray-200"
                >
                  HeadPhone Type
                </p>
                <p
                  onClick={() => handleFilterSelect('Price')}
                  className="font-poppins cursor-pointer px-4 py-2 hover:bg-gray-200"
                >
                  Price
                </p>
                <p
                  onClick={() => handleFilterSelect('Color')}
                  className="font-poppins cursor-pointer px-4 py-2 hover:bg-gray-200"
                >
                  Color
                </p>
                <p
                  onClick={() => handleFilterSelect('Material')}
                  className="font-poppins cursor-pointer px-4 py-2 hover:bg-gray-200"
                >
                  Material
                </p>
                <p
                  onClick={() => handleFilterSelect('Offer')}
                  className="font-poppins cursor-pointer px-4 py-2 hover:bg-gray-200"
                >
                  Offer
                </p>
              </div>
            )}
          </div>
          <p className="font-poppins border xl:rounded-full px-5 2xl:ml-[36rem] justify-self-end py-2">
            Sort By <i className="uil uil-angle-down"></i>
          </p>
        </div>
      </div>
      <div className=" 2xl:mx-32 lg:mx-18 md:mx-12 max-sm:mx-5 font-poppins ">
        <h1 className="2xl:text-3xl text-2xl font-bold mb-10">
          HeadPhones For You!
        </h1>

        <div className="headphones grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center max-sm:grid-cols-2">
          {products ? (
            products.map((item) => (
              <div className="" key={item.item.itemId}>
                <Link
                  to={`/product/${item.item.itemId}`}
                  className="item flex flex-col items-center"
                  onClick={() => handleProductSelect(item.item.itemId)}
                >
                  <img
                    className="w-full h-80 max-sm:w-36 max-sm:h-48"
                    src={item.item.image}
                    alt=""
                  />
                  <i></i>
                  <div className="box">
                    <div className="price flex my-2 max-md:flex-col">
                      <h1>{item.item.title.slice(0, 20)}...</h1>
                      <p className="ml-8 max-sm:ml-0">
                        ${item.item.sku.def.promotionPrice}
                      </p>
                    </div>
                    <div className="rating">
                      <p className="mb-2 text-sm font-light">{`${
                        item.delivery.freeShipping
                          ? 'Free Delivery Available'
                          : 'Delivery Charges Applicable'
                      }`}</p>
                      <p className="mb-2">
                        {item.item.averageStarRate}
                        <i className="uim uim-star"></i>
                      </p>
                    </div>
                  </div>
                </Link>
                <button
                  className="border-2 py-2 px-5 rounded-full hover:bg-emerald-900 hover:text-white transition duration-300"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      {isCheckoutOpen && (
        <Checkout closeCheckout={setIsCheckoutOpen} cartItems={cartItems} />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  products: state.product.products,
});

const mapDispatchToProps = {
  setProducts,
  setSelectProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
