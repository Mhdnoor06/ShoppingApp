import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setProducts, selectProduct } from '../redux/action';
import { useParams } from 'react-router-dom';

import Layout from './Layout';
import axios from 'axios';

function Products({ products }) {
  const [productDetail, setProductDetail] = useState(null);
  const { productId } = useParams();
  console.log(productId);
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
            'b83548d7b8msh62c358033a2f1bcp19521ejsn0f5bd155b388',
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
  }, []);

  console.log(productDetail);

  if (!productDetail) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Layout />
      <div className="products w-full flex mx-32 mt-10 font-poppins max-lg:flex-col max-lg:mx-5">
        <div className="images w-1/2 flex flex-col items-center border">
          <div className="largeimg">
            <img
              className="rounded-lg "
              src={productDetail.result.item.images[0]}
              alt=""
            />
          </div>
          <div className="allimgs flex w-full">
            <img
              className="w-1/4 p-3 rounded-lg"
              src={productDetail.result.item.images[1]}
              alt=""
            />
            <img
              className="w-1/4 p-3 rounded-lg"
              src={productDetail.result.item.images[2]}
              alt=""
            />
            <img
              className="w-1/4 p-3 rounded-lg"
              src={productDetail.result.item.images[3]}
              alt=""
            />
            <img
              className="w-1/4 p-3 rounded-lg"
              src={productDetail.result.item.images[4]}
              alt=""
            />
          </div>
        </div>
        <div className="details w-1/2 ml-20">
          <div className="w-[33rem]">
            <div class="col-span-2">
              <h1 className="font-bold text-3xl">
                {productDetail.result.item.title}
              </h1>
              <div className="my-4">
                <p className="font-light text-sm">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Similique amet consectetur adipisicing elit. Similique
                </p>
                <p>******</p>
              </div>
            </div>
            <div class="col-span-2 my-4">
              <hr />
              <h1 className="text-2xl font-bold mt-5">
                $ {productDetail.result.item.sku.def.price}
              </h1>
              <p className="mt-4">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Ratione at repellendus,
              </p>
            </div>
            <div className="color my-10">
              <hr />
              <p className="mt-5">Choose a color</p>
              <div className="flex mt-4">
                <span className="bg-orange-600  w-10 h-10 ml-3 border p-3 rounded-full"></span>
                <span className="bg-green-600  w-10 h-10 ml-3 border p-3 rounded-full"></span>
                <span className="bg-blue-600  w-10 h-10 ml-3 border p-3 rounded-full"></span>
                <span className="bg-slate-600  w-10 h-10 ml-3 border p-3 rounded-full"></span>
                <span className="bg-yellow-600  w-10 h-10 ml-3 border p-3 rounded-full"></span>
              </div>
            </div>
            <div className="button">
              <hr />
              <div className="flex  items-center mt-10">
                <button className="border rounded-full flex items-center justify-center w-48 py-3 ">
                  <span className="text-xl text-green-800 ">-</span>
                  <span className="text-xl text-green-800 ml-5">1</span>
                  <span className="text-xl text-green-800 ml-5">+</span>
                </button>
                <p className="ml-10">
                  Quantity Available{' '}
                  {productDetail.result.item.sku.def.quantity}
                </p>
              </div>
              <div className="mt-10">
                <button className="border px-20 py-3 rounded-full bg-lime-900 text-white">
                  buy now
                </button>
                <button className="border px-20 py-3 rounded-full ml-3">
                  Add to cart
                </button>
              </div>
            </div>
            <div className="delivery mt-10">
              <div className="p-5 border">
                <h3>free dilevery</h3>
                <p>Enter your postal code</p>
              </div>
              <div className="p-5 border mb-5">
                <h3>Return dilevery</h3>
                <p>30 days delivery return. details</p>
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
});

const mapDispatchToProps = {
  setProducts,
  selectProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
