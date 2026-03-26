import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const addSubject = (data) => API.post("/subjects", data);
export const getSubjects = () => API.get("/subjects");
