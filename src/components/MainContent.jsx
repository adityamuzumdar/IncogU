import React from 'react';

const MainContent = ({ posts }) => {
  return (
    <div className="w-3/4 p-4">
      {/* Render your posts or any other content */}
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id} className="border p-2 mb-2">
          {post.title}
        </div>
      ))}
    </div>
  );
};

export default MainContent;
