import React from 'react';

const Sidebar = ({ onAddPostClick, collegeNames }) => {
  return (
    <div className="w-1/6 bg-gray-200 p-4">
      <button onClick={onAddPostClick} className="bg-blue-500 text-white p-2 mb-4">
        Add Post
      </button>
      <h3 className="mb-2">Colleges:</h3>
      <ul>
        {collegeNames.map((college, index) => (
          <li key={index} className="mb-2">
            {college}
          </li>
        ))}
      </ul>
      {/* Add other sidebar content as needed */}
    </div>
  );
};

export default Sidebar;
