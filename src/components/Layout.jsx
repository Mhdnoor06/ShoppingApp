import React, { useState } from 'react';

function Layout({ setCheckout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  return (
    <div className="main w-full overflow-x-hidden">
      <div className="menu flex xl:flex-row mx-4 mt-5 2xl:mx-32  font-poppins justify-between">
        {/* Menu content */}
        <h1 className="font-bold text-2xl xl:text-3xl mb-4 xl:mb-0">
          <i className="uil uil-shopping-cart-alt font-bold text-3xl"></i>
          ShopCart
        </h1>
        <div className="xl:flex items-center">
          <ul
            className={`flex flex-col xl:flex-row mx-10 2xl:mx-20 ${
              isMenuOpen ? 'xl:flex' : 'hidden xl:flex'
            }`}
          >
            <li className="my-2 xl:my-0 xl:mr-6 2xl:mr-10">
              Categories <i className="uil uil-angle-down"></i>
            </li>
            <li className="my-2 xl:my-0 xl:mr-6 2xl:mr-10">Deals</li>
            <li className="my-2 xl:my-0 xl:mr-6 2xl:mr-10">What's New</li>
            <li className="my-2 xl:my-0 xl:mr-6 2xl:mr-10">Delivery</li>
          </ul>
          <div className="flex items-center relative">
            <input
              type="text"
              className="w-[12rem] md:w-[20rem] lg:w-[30rem] px-4 py-2 pl-12 rounded-3xl border"
              placeholder="Search Products"
            />
            <i className="uil uil-search absolute left-3 top-1/2 transform -translate-y-1/2 font-bold text-xl"></i>
            <p className="hidden xl:block mx-6">
              <i className="uil uil-user font-bold text-xl"></i> Account
            </p>
            <p
              className="hidden xl:block cursor-pointer"
              onClick={() => {
                setCheckout(true); // Open the checkout component when clicked
              }}
            >
              <i className="uil uil-shopping-cart-alt text-xl"></i> Cart
            </p>
          </div>
        </div>
        {/* Hamburger Menu */}
        <div className="xl:hidden cursor-pointer text-xl" onClick={toggleMenu}>
          &#9776;
        </div>
      </div>
    </div>
  );
}

export default Layout;
