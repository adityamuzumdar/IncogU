import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import appwriteService from '../appwrite/config';

function MainContent() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts();
        if (response) {
          setPosts(response.documents);
        } else {
          console.error('Error fetching posts:', response);
          // Handle the error appropriately
        }
      } catch (error) {
        console.error('Error in fetchPosts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <div className="flex-grow p-8">
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
          {posts.map((post) => (
            <Link key={post.$id} to={`/${post.$id}`} className="post-link">
              <div className="mb-4">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <div className="text-blue-400">{post.college}</div>
                <div dangerouslySetInnerHTML={renderHTML(post.content)} />
                
                {/* Add other post details as needed */}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default MainContent;
