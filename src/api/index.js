import axios from "axios";

const URL = "http://localhost:5000";

const customConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const fetchPosts = async () => {
  try {
    return await axios.get(`${URL}/posts`);
  } catch (error) {
    console.error(error);
  }
};

export const createPost = (payload) =>
  axios.post(`${URL}/posts`, payload, customConfig);
