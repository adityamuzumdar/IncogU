import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../store/authSlice';
import authService from '../appwrite/auth';
import MHeader from '../components/MHeader';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import appwriteService from "../appwrite/config";

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [addPostWindowOpen, setAddPostWindowOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postTitle, setPostTitle] = useState('');
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
    setAddPostWindowOpen(true);
  };

  const handlePostEditorChange = (content) => {
    setPostContent(content);
  };

  const handlePostTitleChange = (e) => {
    setPostTitle(e.target.value);
  };

  // ... (existing code)

const handleSavePost = async () => {
  try {
    // Make sure the user is logged in
    if (!userData) {
      console.error('User not logged in.');
      return;
    }

    // Check if both title and content are not empty
    if (!postTitle.trim() || !postContent.trim()) {
      console.error('Title and content cannot be empty.');
      return;
    }
    
    // Dummy values for other properties
    console.log(userData)
    const userId = userData.$id.toString();
    console.log(userId) // Assuming user data has an 'id' property
    const status = 'active'; // You can set it to 'published' or 'draft' based on your logic
    const slug = postTitle; // You may generate a slug based on the title or use a library for this
    const email=userData.email;
    function getcollege(email){
      const atIndex = email.indexOf('@');
      const dotIndex = email.indexOf('.', atIndex);

      if (atIndex !== -1 && dotIndex !== -1) {
          const extractedText = email.substring(atIndex + 1, dotIndex);
          return extractedText;
      } else {
          
          return 'Invalid email format';
      }
  };
  const college=getcollege(email);
  console.log(college);
    // Prepare the post data
    const postData = {
      title: postTitle,
      slug,
      content: postContent,
      userId,
      status,
      // Add a dummy URL for the featured image
      featuredImage: 'https://example.com/image.jpg',
      college: college,
    };

    // Call the createPost function to save the post
    const response = await appwriteService.createPost(postData);

    // Check the response from the createPost function
    if (response.status === 201) {
      console.log('Post saved successfully:', response.data);
      // Close the post editor window
      setAddPostWindowOpen(false);
      // You can also update the posts state or perform any other necessary actions
    } else {
      console.error('Error saving post:', response);
      // Handle the error appropriately
    }
  } catch (error) {
    console.error('Error in handleSavePost:', error);
  }
};

// ... (rest of the component)


  const collegeNames = ['College A', 'College B', 'College C']; // Replace with your actual college names
  

  return (
    <>
      {loading ? (
        <div className="mb-10">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Loading...</h2>
        </div>
      ) : (
        <>
          {userData && userData.emailVerification ? (
            <div>
              <MHeader />
              <div className="flex">
                <Sidebar onAddPostClick={handleAddPostClick} collegeNames={collegeNames} />
                <MainContent/>
              </div>
              {addPostWindowOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                  <div className="bg-white p-4 rounded-md w-96">
                    <h2 className="text-xl font-semibold mb-4">Add Post</h2>
                    <input
                      type="text"
                      placeholder="Post Title"
                      className="w-full border rounded-md p-2 mb-4"
                      value={postTitle}
                      onChange={handlePostTitleChange}
                    />
                    <ReactQuill
                      theme="snow"
                      value={postContent}
                      onChange={handlePostEditorChange}
                    />
                    <div className="flex justify-end mt-4">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={handleSavePost}
                      >
                        Save
                      </button>
                      <button
                        className="ml-2 text-gray-600 px-4 py-2 rounded-md border"
                        onClick={() => setAddPostWindowOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mb-10">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                You are not logged in.
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
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

//adityamuzumdar
//adityamuzumdar11@gmail.com