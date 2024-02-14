import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';

function PostDetail() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await appwriteService.getPost(postId);
        if (response) {
          setPost(response);
        } else {
          console.error('Error fetching post:', response);
          // Handle the error appropriately
        }
      } catch (error) {
        console.error('Error in fetchPost:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Replace with your logic to fetch comments for the post
        const response = await appwriteService.getCommentsForPost(postId);
        if (response) {
          setComments(response);
        } else {
          console.error('Error fetching comments:', response);
          // Handle the error appropriately
        }
      } catch (error) {
        console.error('Error in fetchComments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      // Replace with your logic to submit a new comment for the post
      await appwriteService.addComment(postId, newComment);
      // Fetch comments again to update the comments list
      await fetchComments();
      // Clear the new comment input
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      // Handle the error appropriately
    }
  };

  return (
    <div className="flex-grow p-8">
      {loading ? (
        <p>Loading post...</p>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold">{post.title}</h2>
          <div className="text-blue-400">{post.college}</div>
          <div dangerouslySetInnerHTML={renderHTML(post.content)} />

          {/* Comment Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>{comment.text}</li>
              ))}
            </ul>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
            />
            <button type="submit">Submit Comment</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
