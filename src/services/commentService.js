// src/services/commentService.js

const API_URL = 'http://localhost:8088';

/**
 * Fetches comments for a specific post.
 * 
 * @param {number} postId - The ID of the post to fetch comments for.
 * @returns {Promise<Object[]>} A promise resolving to an array of comment objects.
 */
export const getCommentsByPostId = async (postId) => {
  try {
    const response = await fetch(`${API_URL}/comments?postId=${postId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch comments for post ${postId}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

/**
 * Adds a new comment.
 * 
 * @param {Object} comment - The comment object to add.
 * @param {number} comment.postId - The ID of the post to add the comment to.
 * @param {string} comment.text - The text content of the comment.
 * @returns {Promise<Object>} A promise resolving to the added comment object.
 */
export const addComment = async (comment) => {
  try {
    const response = await fetch(`${API_URL}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    });
    if (!response.ok) {
      throw new Error('Failed to add comment');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

/**
 * Deletes a comment by ID.
 * 
 * @param {number} commentId - The ID of the comment to delete.
 * @returns {Promise<void>} A promise resolving when the comment has been deleted.
 */
export const deleteComment = async (commentId) => {
  try {
    const response = await fetch(`${API_URL}/comments/${commentId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete comment ${commentId}`);
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

/**
 * Fetches comments for a specific user.
 * 
 * @param {number} userId - The ID of the user to fetch comments for.
 * @returns {Promise<Object[]>} A promise resolving to an array of comment objects.
 */
export const getCommentsByUserId = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/comments?userId=${userId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch comments for user ${userId}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  };