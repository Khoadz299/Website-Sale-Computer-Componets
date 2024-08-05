import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex w-full bg-gradient-to-r from-purple-500 to-red-500 via-blue-500">
      <a href="/">
        <img
          src="../src/assets/logo-brand.png"
          alt="img-logo"
          className="object-contain h-24 w-24 mx-20 scale-[2.5]"
        />
      </a>

      <ul className="flex mx-20 w-4/5 justify-around items-center text-black ">
        <li className="cursor-pointer relative lg:ml-4 ">
          <Link to="/product/cpu">CPU</Link>
        </li>
        <li className="cursor-pointer relative lg:ml-4">
          <Link to="/product/vga">VGA</Link>
        </li>
        <li className="cursor-pointer relative lg:ml-4">
          <Link to="/product/monitor">Màn hình</Link>
        </li>
        <li className="cursor-pointer relative lg:ml-4">
          <Link to="/product/storage">Ổ cứng</Link>
        </li>
        <li className="cursor-pointer relative lg:ml-4">
          <Link to="/product/ram">RAM</Link>
        </li>
        <li className="cursor-pointer relative lg:ml-4">
          <Link to="/product/psu">PSU</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
