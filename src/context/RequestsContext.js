import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../api/axios";

const RequestsContext = createContext();

export const RequestsProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);

  const load = useCallback(async () => {
    try {
      const res = await api.get("/requests");
      setRequests(res.data);
    } catch (err) {
      console.error("Error loading requests:", err);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, [load]);

  const addRequest = async (email, name = "") => {
    try {
      await api.post("/requests", { email, name });
      await load();
    } catch (err) {
      console.error("Error adding request:", err);
    }
  };

  const updateRequest = async (id, status) => {
    try {
      await api.put(`/requests/${id}`, { status });
      await load();
    } catch (err) {
      console.error("Error updating request:", err);
    }
  };

  const deleteRequest = async (id) => {
    try {
      await api.delete(`/requests/${id}`);
      await load();
    } catch (err) {
      console.error("Error deleting request:", err);
    }
  };

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <RequestsContext.Provider value={{ requests, addRequest, updateRequest, deleteRequest, pendingCount, load }}>
      {children}
    </RequestsContext.Provider>
  );
};

export const useRequests = () => useContext(RequestsContext);
