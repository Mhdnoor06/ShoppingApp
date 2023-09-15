import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setProducts, setSelectProduct } from '../redux/action';
import { useParams } from 'react-router-dom';

import Layout from './Layout';
import axios from 'axios';

function Product({ products, selectProduct }) {
  const [productDetail, setProductDetail] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  console.log(products);

  const handleIncrement = () => {
    setQuantity(quantity + 1); // Increase quantity by 1
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); // Decrease quantity by 1, but not below 1
    }
  };

  useEffect(() => {
    const fetchProductDetail = async () => {
      const options = {
        method: 'GET',
        url: 'https://aliexpress-datahub.p.rapidapi.com/item_detail',
        params: {
          itemId: productId,
        },
        headers: {
          'X-RapidAPI-Key':
            'de61fc37a6msh7e351480c227941p1c8916jsn355e046976ba',
          'X-RapidAPI-Host': 'aliexpress-datahub.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        setProductDetail(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductDetail();
  }, [productId]);

  if (!productDetail) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Layout setCheckout={setIsCheckoutOpen} />
      <div className="products flex flex-col lg:flex-row mx-5 mt-10 font-poppins">
        <div className="images lg:w-2/5 flex flex-col border">
          <div className="largeimg flex justify-center">
            <img
              className="w-9/12 rounded-lg"
              src={productDetail.result.item.images[0]}
              alt=""
            />
          </div>
          <div className="allimgs flex w-full overflow-x-auto mt-3 justify-center">
            {productDetail.result.item.images
              .slice(1, 5)
              .map((image, index) => (
                <img
                  key={index}
                  className="w-1/4 p-3 rounded-lg"
                  src={image}
                  alt=""
                />
              ))}
          </div>
        </div>
        <div className="details w-full lg:w-1/2 ml-0 lg:ml-20">
          <div className="w-full">
            <h1 className="text-2xl">{productDetail.result.item.title}</h1>
            <div className="my-4">
              <p className="font-light text-sm">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Similique amet consectetur adipisicing elit. Similique
              </p>
              <p>******</p>
            </div>
            <hr />
            <h1 className="text-2xl font-bold mt-5">
              $ {productDetail.result.item.sku.def.price}
            </h1>
            <p className="mt-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
              at repellendus,
            </p>
            <br />
            <hr />
            <p className="mt-5">Choose a color</p>
            <div className="flex mt-4">
              <span className="bg-orange-600 w-10 h-10 ml-3 border p-3 rounded-full"></span>
              <span className="bg-green-600 w-10 h-10 ml-3 border p-3 rounded-full"></span>
              <span className="bg-blue-600 w-10 h-10 ml-3 border p-3 rounded-full"></span>
              <span className="bg-slate-600 w-10 h-10 ml-3 border p-3 rounded-full"></span>
              <span className="bg-yellow-600 w-10 h-10 ml-3 border p-3 rounded-full"></span>
            </div>
            <br />
            <hr />
            <div className="flex items-center mt-5">
              <button
                className="border rounded-full flex items-center justify-center w-1/6 py-3"
                onClick={handleDecrement} // Decrease quantity when clicked
              >
                <span className="text-xl text-green-800">-</span>
              </button>
              <span className="text-xl text-green-800 ml-3">{quantity}</span>
              <button
                className="border rounded-full flex items-center justify-center w-1/6 py-3 mx-3 hover:bg-lime-90 text-white"
                onClick={handleIncrement} // Increase quantity when clicked
              >
                <span className="text-xl text-green-800">+</span>
              </button>
              <p className="ml-5">
                Quantity Available {productDetail.result.item.sku.def.quantity}
              </p>
            </div>
            <div className="mt-5">
              <button className="border px-20 py-3 rounded-full bg-lime-900 text-white">
                Buy Now
              </button>
              <button className="border px-20 py-3 rounded-full ml-3">
                Add to Cart
              </button>
            </div>
            <div className="delivery mt-5">
              <div className="p-5 border">
                <h3>Free Delivery</h3>
                <p>Enter your postal code</p>
              </div>
              <div className="p-5 border mb-5">
                <h3>Return Delivery</h3>
                <p>30 days delivery return. Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  products: state.product.products,
  selectProduct: state.product.selectedProduct,
});

const mapDispatchToProps = {
  setProducts,
  setSelectProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
