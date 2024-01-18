import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../store/authSlice';
import authService from '../appwrite/auth';
import MHeader from '../components/MHeader';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userDataResponse) => {
        setUserData(userDataResponse);
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
      dispatch(logout());
    });
  };

  const handleAddPostClick = () => {
    // Handle logic for adding a post
    console.log('Add Post Clicked');
  };

  const collegeNames = ['College A', 'College B', 'College C']; // Replace with your actual college names
  const posts=[
    {
      id: "1234",
      title : "testing"
    }
  ]
return (
  <>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <>
        {userData ? (
          <div>
            <MHeader />
            <div className="flex">
              <Sidebar onAddPostClick={handleAddPostClick} collegeNames={collegeNames} />
              <MainContent posts={posts} />
            </div>
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
