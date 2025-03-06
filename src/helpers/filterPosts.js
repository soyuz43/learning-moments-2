// src/helpers/filterPosts.js
export const filterPosts = (posts, selectedTopic, searchTerm) => {
    return posts.filter(post => 
      (!selectedTopic || post.topic?.name === selectedTopic) &&
      (!searchTerm || post.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };
  