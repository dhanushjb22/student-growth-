import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, UserCheck, UserX, Mail, X } from "lucide-react";
import { useRequests } from "../context/RequestsContext";
import { useNavigate } from "react-router-dom";

export default function AdminNotifications() {
  const { requests, updateRequest, pendingCount } = useRequests();
  const [open, setOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const prevCountRef = useRef(pendingCount);
  const navigate = useNavigate();

  useEffect(() => {
    if (pendingCount > prevCountRef.current) {
      const newReqs = requests.filter((r) => r.status === "pending");
      const latest = newReqs[newReqs.length - 1];
      if (latest) {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, email: latest.email, name: latest.name }]);
        setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5000);
      }
    }
    prevCountRef.current = pendingCount;
  }, [pendingCount, requests]);

  const pending = requests.filter((r) => r.status === "pending");

  return (
    <>
      <div className="fixed top-5 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen((o) => !o)}
          className="relative bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-2xl shadow-lg shadow-amber-500/40"
        >
          <Bell size={22} className="text-white" />
          {pendingCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
            >
              {pendingCount}
            </motion.span>
          )}
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 mt-3 w-96 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Bell size={16} className="text-amber-400" />
                  Admin Access Requests
                  {pendingCount > 0 && (
                    <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">{pendingCount}</span>
                  )}
                </h3>
                <button onClick={() => setOpen(false)}><X size={16} className="text-slate-400 hover:text-white" /></button>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {pending.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-sm">No pending requests</div>
                ) : (
                  pending.map((req) => (
                    <motion.div
                      key={req._id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="px-5 py-4 border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-amber-500/20 p-2 rounded-lg">
                          <Mail size={16} className="text-amber-400" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{req.name || req.email}</p>
                          <p className="text-xs text-cyan-400">{req.email}</p>
                          <p className="text-xs text-slate-400">{new Date(req.requestedAt).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                          onClick={() => updateRequest(req._id, "approved")}
                          className="flex-1 flex items-center justify-center gap-1 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white text-xs font-bold"
                        >
                          <UserCheck size={14} /> Approve
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                          onClick={() => updateRequest(req._id, "rejected")}
                          className="flex-1 flex items-center justify-center gap-1 py-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl text-white text-xs font-bold"
                        >
                          <UserX size={14} /> Reject
                        </motion.button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {pending.length > 0 && (
                <div className="px-5 py-3 border-t border-white/10">
                  <button
                    onClick={() => { navigate("/admin/access-requests"); setOpen(false); }}
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
                  >
                    View all requests →
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="fixed bottom-6 right-6 z-50 space-y-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="bg-slate-900 border border-amber-500/40 rounded-2xl px-5 py-4 shadow-2xl flex items-center gap-3 min-w-72"
            >
              <div className="bg-amber-500/20 p-2 rounded-lg">
                <Bell size={18} className="text-amber-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">New Admin Request!</p>
                <p className="text-slate-400 text-xs">{toast.name || toast.email} wants admin access</p>
              </div>
              <button onClick={() => setToasts((p) => p.filter((t) => t.id !== toast.id))}>
                <X size={14} className="text-slate-400 hover:text-white" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
