// src/services/engagementService.js
const apiUrl = "http://localhost:8088";

/**
 * Add a like relationship between the current user and the specified post.
 * @param {number} postId - ID of the post to like.
 * @param {number} userId - ID of the user who is liking the post.
 * @returns {Promise<object>} The created like object.
 */
export const addLike = async (postId, userId) => {
  try {
    const response = await fetch(`${apiUrl}/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, userId }),
    });
    if (!response.ok) {
      throw new Error("Failed to add like");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding like:", error);
    throw error;
  }
};

/**
 * Remove an existing like by its ID.
 * @param {number} likeId - ID of the like entry to remove.
 * @returns {Promise<void>}
 */
export const removeLike = async (likeId) => {
  try {
    const response = await fetch(`${apiUrl}/likes/${likeId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to remove like");
    }
  } catch (error) {
    console.error("Error removing like:", error);
    throw error;
  }
};

/**
 * Fetch likes for a specific user.
 * @param {number} userId - ID of the user whose likes to fetch.
 * @returns {Promise<object[]>} Array of like objects.
 */
export const getLikesForUser = async (userId) => {
  try {
    const response = await fetch(`${apiUrl}/likes?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch likes for user");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching likes for user:", error);
    throw error;
  }
};
