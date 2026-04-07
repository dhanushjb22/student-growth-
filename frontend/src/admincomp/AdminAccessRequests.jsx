import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, UserX, Mail, Clock, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { useRequests } from "../context/RequestsContext";

export default function AdminAccessRequests() {
  const { requests, updateRequest, deleteRequest } = useRequests();

  const pending = requests.filter((r) => r.status === "pending");
  const resolved = requests.filter((r) => r.status !== "pending");

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
        Admin Access Requests
      </h1>
      <p className="text-slate-400 mb-8">Approve, reject or delete admin access requests.</p>

      {/* Pending */}
      <h2 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
        <Clock size={18} /> Pending ({pending.length})
      </h2>

      {pending.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-slate-400 mb-8">
          No pending requests.
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          <AnimatePresence>
            {requests.map((req, i) =>
              req.status === "pending" ? (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="bg-white/5 border border-amber-500/20 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-500/20 p-3 rounded-xl">
                      <Mail size={20} className="text-amber-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{req.name || req.email}</p>
                      <p className="text-xs text-cyan-400">{req.email}</p>
                      <p className="text-xs text-slate-400">Requested at: {req.requestedAt}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => updateRequest(i, "approved")}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold text-sm shadow-lg"
                    >
                      <UserCheck size={15} /> Approve
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => updateRequest(i, "rejected")}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl font-semibold text-sm shadow-lg"
                    >
                      <UserX size={15} /> Reject
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => deleteRequest(i)}
                      className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm"
                    >
                      <Trash2 size={15} className="text-slate-300" />
                    </motion.button>
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Resolved */}
      {resolved.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-slate-400 mb-4">Resolved ({resolved.length})</h2>
          <div className="space-y-3">
            <AnimatePresence>
              {requests.map((req, i) =>
                req.status !== "pending" ? (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: 30 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      {req.status === "approved"
                        ? <CheckCircle size={20} className="text-green-400" />
                        : <XCircle size={20} className="text-red-400" />}
                      <div>
                        <p className="font-semibold text-white">{req.email}</p>
                        <p className="text-xs text-slate-400">{req.resolvedAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${req.status === "approved" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                        {req.status.toUpperCase()}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                        onClick={() => deleteRequest(i)}
                        className="p-2 bg-white/5 hover:bg-red-500/20 rounded-lg transition"
                      >
                        <Trash2 size={15} className="text-slate-400 hover:text-red-400" />
                      </motion.button>
                    </div>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
}
