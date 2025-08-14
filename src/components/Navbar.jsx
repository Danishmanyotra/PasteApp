import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="flex flex-row gap-4 place-content-evenly p-3 bg-blue-500">
      <NavLink to="/" className='font-bold text-2xl text-white p-2'>Home</NavLink>
      <NavLink to="/pastes" className='font-bold text-2xl text-white p-2'>Pastes</NavLink>
    </div>
  );
};

export default Navbar;
