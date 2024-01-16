import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from "../store/authSlice";
import authService from '../appwrite/auth';

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); // Declare userData state
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userDataResponse) => {
        console.log(userDataResponse);
        setUserData(userDataResponse); // Set the userData state
        if (userDataResponse) {
          dispatch(login({ userData: userDataResponse }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  const logoutHandler = () => {
      authService.logout().then(() => {
          dispatch(logout())
      })
  }
  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {userData ? (
              <p>Welcome, {userData.email}!</p>
              
            ) : (
              <p>Not Logged In</p>
            )}
            <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
