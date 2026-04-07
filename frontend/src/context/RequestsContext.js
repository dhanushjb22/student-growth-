import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

const RequestsContext = createContext();
const STORAGE_KEY = "adminAccessRequests";

export const RequestsProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const channelRef = useRef(null);

  const load = useCallback(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setRequests(data);
  }, []);

  // notify all tabs of change
  const broadcast = () => {
    if (channelRef.current) channelRef.current.postMessage("update");
  };

  useEffect(() => {
    load();

    // BroadcastChannel for real-time cross-tab sync
    const channel = new BroadcastChannel("admin_requests_channel");
    channelRef.current = channel;
    channel.onmessage = () => load();

    // fallback polling every 1s for same-tab updates
    const interval = setInterval(load, 1000);

    return () => {
      channel.close();
      clearInterval(interval);
    };
  }, [load]);

  const addRequest = (email, name = "") => {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const updated = [
      ...existing,
      {
        email,
        name,
        status: "pending",
        requestedAt: new Date().toLocaleString(),
      },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setRequests(updated);
    broadcast();
  };

  const updateRequest = (index, status) => {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    all[index].status = status;
    all[index].resolvedAt = new Date().toLocaleString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    setRequests([...all]);
    broadcast();
  };

  const deleteRequest = (index) => {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    all.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    setRequests([...all]);
    broadcast();
  };

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <RequestsContext.Provider value={{ requests, addRequest, updateRequest, deleteRequest, pendingCount, load }}>
      {children}
    </RequestsContext.Provider>
  );
};

export const useRequests = () => useContext(RequestsContext);
