import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from "../store/authSlice";
import authService from '../appwrite/auth';
import MHeader from '../components/MHeader';
import Posts from '../components/Posts';

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
    <>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {userData ? (
              <div>
              <MHeader/>
              <Posts/>
              </div>
            ) : (
              <p>Not Logged In</p>
            )}
          </>
        )}
    </>

  );
}

export default HomePage;
