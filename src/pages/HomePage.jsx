import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../store/authSlice';
import authService from '../appwrite/auth';
import MHeader from '../components/MHeader';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import { Link } from 'react-router-dom';

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
       <div className="mb-10">
            
       <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
           Loading...
       </h2>
      
     </div>
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

          <div className="mb-10">
            
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                You are not logged in.
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account? {' '}
            <Link to='/login' className="font-medium text-blue-600 hover:text-blue-500">
                Login
            </Link>
            </p>
          </div>
        )}
      </>
    )}
  </>
);
}

export default HomePage;
