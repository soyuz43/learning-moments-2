// services/postService.js

const apiUrl = 'http://localhost:8088';

export const getPosts = async () => {
  try {
    const response = await fetch('http://localhost:8088/posts');
    const posts = await response.json();

    // Fetch topics
    const topicsResponse = await fetch('http://localhost:8088/topics');
    const topics = await topicsResponse.json();

    // Merge posts with topics
    return posts.map(post => ({
      ...post,
      topic: topics.find(topic => topic.id === post.topicId) || { name: 'Unknown Topic' }
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getTopics = async () => {
  try {
    const response = await fetch(`${apiUrl}/topics`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch(`${apiUrl}/users`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getLikes = async () => {
  try {
    const response = await fetch(`${apiUrl}/likes`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching likes:', error);
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/posts/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    throw error;
  }
};

export const getPostsByTopicId = async (topicId) => {
  try {
    const response = await fetch(`${apiUrl}/posts?topicId=${topicId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching posts for topic ${topicId}:`, error);
    throw error;
  }
};

export const getPostsByUserId = async (userId) => {
  try {
    const response = await fetch(`${apiUrl}/posts?userId=${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error);
    throw error;
  }
};


export const deletePost = async (postId) => {
  await fetch(`${apiUrl}/posts/${postId}`, {
    method: "DELETE",
  });
};

export const createPost = async (postData) => {
  const response = await fetch(`${apiUrl}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  return response.json();
};