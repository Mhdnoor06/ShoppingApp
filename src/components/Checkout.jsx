import React from 'react';

function Checkout({ closeCheckout, cartItems }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-300 bg-opacity-75">
      <div className="bg-white p-4 lg:p-8 shadow-lg rounded-lg lg:w-2/3 xl:w-1/3">
        {/* Add your checkout form and content here */}
        <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
        <div>
          <h2>Your Cart</h2>
          <div className="max-h-64 overflow-y-auto">
            {/* Use max-h-64 to limit the height and overflow-y-auto to enable scrolling */}
            <ul>
              {cartItems.map((cartItem) => (
                <div
                  className="flex py-3 items-center"
                  key={cartItem.items.itemId}
                >
                  <img
                    className="w-5 lg:w-20 lg:h-20"
                    src={cartItem.items.image}
                    alt=""
                  />
                  <li className="px-2 lg:px-5">
                    <h1 className="text-sm lg:text-base">
                      {cartItem.items.title.slice(0, 60)}...
                    </h1>
                    <p className="ml-2 lg:ml-0">
                      ${cartItem.items.sku.def.promotionPrice} x
                      {cartItem.quantity}
                    </p>
                  </li>
                </div>
              ))}
            </ul>
          </div>
          {/* Add the total and checkout button */}

          <div className="flex">
            <button
              className="border px-6 lg:px-20 py-3 rounded-full bg-lime-900 text-white mt-4"
              onClick={() => {
                closeCheckout(false);
              }}
            >
              Buy Now
            </button>{' '}
            <button
              className="border px-6 lg:px-20 py-3 rounded-full bg-lime-900 text-white mt-4"
              onClick={() => {
                closeCheckout(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
