import axios from "axios";

export default axios.create({
  baseURL: "https://student-growth-4.onrender.com/api",
  withCredentials: true
});
