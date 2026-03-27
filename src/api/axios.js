import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://student-growth-4.onrender.com/api",
  withCredentials: true
});
