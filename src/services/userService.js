// src/services/userService.js

export const getUserByEmail = async (email) => {
  try {
    const response = await fetch(`http://localhost:8088/users?email=${email}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const response = await fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};