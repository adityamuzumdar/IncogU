// SearchBar.js
import React from 'react';
import { IoIosSearch } from "react-icons/io";

const SearchBar = () => {
  return (
    <div className="relative">
      <IoIosSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        className="border border-black p-2 pl-10 m-2 rounded-full w-full "  // Adjusted the width
      />
    </div>
  );
};

export default SearchBar;
