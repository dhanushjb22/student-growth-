import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Check, Plus, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function AccountSwitcher({ isOpen, onClose }) {
  const { user, login } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    if (isOpen) {
      loadAccounts();
    }
  }, [isOpen]);

  const loadAccounts = async () => {
    try {
      const res = await api.get("/students");
      setAccounts(res.data);
    } catch (error) {
      console.error("Error loading accounts:", error);
    }
  };

  const switchAccount = (email) => {
    login({ email, role: "student" });
    onClose();
    window.location.reload();
  };

  const addAccount = async () => {
    if (!newEmail) return;
    try {
      const name = newEmail.split('@')[0].charAt(0).toUpperCase() + newEmail.split('@')[0].slice(1);
      await api.post("/students", {
        name: name,
        rollNumber: `STU${Date.now().toString().slice(-6)}`,
        email: newEmail,
        department: "General",
        semester: "Semester 1"
      });
      setNewEmail("");
      setShowAddAccount(false);
      loadAccounts();
    } catch (error) {
      console.error("Error adding account:", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl shadow-2xl border border-white/20 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg"
                  >
                    <Users size={24} className="text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Switch Account</h2>
                    <p className="text-xs text-slate-400">Select or add student account</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X size={20} className="text-white" />
                </motion.button>
              </div>
            </div>

            {/* Accounts List */}
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                {accounts.map((account, i) => (
                  <motion.button
                    key={account._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => switchAccount(account.email)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                      user?.email === account.email
                        ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-cyan-400"
                        : "bg-white/5 border-white/10 hover:border-cyan-400/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold overflow-hidden ${
                          user?.email === account.email
                            ? "bg-gradient-to-br from-cyan-500 to-blue-600"
                            : "bg-gradient-to-br from-slate-700 to-slate-600"
                        }`}
                      >
                        {account.profilePicture ? (
                          <img src={account.profilePicture} alt={account.name} className="w-full h-full object-cover" />
                        ) : (
                          account.name.charAt(0)
                        )}
                      </motion.div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-white">{account.name}</p>
                        <p className="text-xs text-slate-400">{account.email}</p>
                        <p className="text-xs text-cyan-400">{account.rollNumber} • {account.semester}</p>
                      </div>
                      {user?.email === account.email && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="p-2 bg-cyan-500 rounded-full"
                        >
                          <Check size={16} className="text-white" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Add Account Section */}
              <AnimatePresence>
                {showAddAccount ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10"
                  >
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 mb-3"
                    />
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={addAccount}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold"
                      >
                        Add Account
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowAddAccount(false)}
                        className="px-4 py-2 bg-white/10 text-white rounded-lg"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: accounts.length * 0.1 + 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAddAccount(true)}
                    className="w-full mt-4 p-4 border-2 border-dashed border-white/20 rounded-xl hover:border-cyan-400 transition-colors flex items-center justify-center gap-2 text-slate-400 hover:text-cyan-400"
                  >
                    <Plus size={20} />
                    <span className="font-semibold">Add New Account</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
