// Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import SearchBar from './SearchBar'
import { FaUserNinja } from "react-icons/fa";
import {useDispatch} from 'react-redux'
import authService from '../appwrite/auth'
import {logout} from '../store/authSlice'

const MHeader = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = () => {
    authService.logout().then(() => {
        dispatch(logout())
        navigate("/login")
    })
}
  return (
    <header className="p-4 flex justify-between">
      {/* Logo on the left */}
      <Link to="/" className="">
      <img 
                    alt=""
                    className="h-15 w-14"
                    src="/incogu.png"/>
      </Link>

      {/* Search bar */}
      <SearchBar/>

      {/* Logout and user pic on the right */}
      <div className="flex space-x-10 mx-6 mb-1">
        {/* Add your logout button and user pic component here */}
        <button onClick={handleLogout} className="text-xl">
          Logout
        </button>
        <div className="flex items-center ">
        <FaUserNinja />
        </div>
      </div>
    </header>
  );
};

export default MHeader;
