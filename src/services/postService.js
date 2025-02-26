// services/postService.js

const apiUrl = 'http://localhost:8088';

export const getPosts = async () => {
  try {
    const response = await fetch(`${apiUrl}/posts`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};