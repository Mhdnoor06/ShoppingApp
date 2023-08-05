import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setProducts, selectProduct } from '../redux/action';
import axios from 'axios';
import Layout from './Layout';

function Body({ products, setProducts, selectProduct }) {
  const [isfilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Select Filter');

  const toggleFilter = () => {
    setIsFilterOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
  };

  const handleProductSelect = (productId) => {
    selectProduct(productId);
  };

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
            'b83548d7b8msh62c358033a2f1bcp19521ejsn0f5bd155b388',
          'X-RapidAPI-Host': 'aliexpress-datahub.p.rapidapi.com',
        },
      };
      try {
        const response = await axios.request(options);
        setProducts(response.data.result.resultList);
      } catch (error) {
        console.error(error);
      }
    };

    if (!products.length) {
      fetchData();
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
      <Layout />
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
              <Link
                to={`/product/${item.item.itemId}`}
                className="item flex flex-col items-center"
                key={item.item.itemId}
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
                    <button className="border-2 py-2 px-5 rounded-full hover:bg-emerald-900 hover:text-white transition duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  products: state.product.products,
});

const mapDispatchToProps = {
  setProducts,
  selectProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
