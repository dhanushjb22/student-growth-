import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, ArrowRight, Sparkles, Shield } from "lucide-react";
import { useRequests } from "../context/RequestsContext";

export default function Register() {
  const navigate = useNavigate();
  const { addRequest } = useRequests();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [requestSent, setRequestSent] = useState(false);

  const REAL_ADMIN = "admin@gmail.com";

  const handleRoleSelect = (r) => {
    setRole(r);
    if (r === "admin" && email && email !== REAL_ADMIN) {
      addRequest(email, name);
      setRequestSent(true);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (role === "admin" && email !== REAL_ADMIN) {
      if (email) { addRequest(email, name); }
      navigate("/");
      return;
    }
    localStorage.setItem("user", JSON.stringify({ name, email, password, role }));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 p-4 relative overflow-hidden">
      
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-2xl shadow-2xl">
              <UserPlus size={48} className="text-white" />
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleRegister}
          className="bg-white/90 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-white/50"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
              Create Account
              <Sparkles size={28} className="text-yellow-500" />
            </h1>
            <p className="text-center text-slate-600 mb-8 font-medium">Join us and track your academic growth</p>
          </motion.div>

          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="relative group"
            >
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors" size={20} />
              <input
                className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white/50"
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="relative group"
            >
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors" size={20} />
              <input
                type="email"
                className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white/50"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="relative group"
            >
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors" size={20} />
              <input
                type="password"
                className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white/50"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm mb-3 font-semibold text-slate-700">Select Role</p>
              <div className="grid grid-cols-2 gap-4">
                {["student", "admin"].map((r) => (
                  <motion.button
                    key={r}
                    type="button"
                    onClick={() => handleRoleSelect(r)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 font-semibold capitalize ${
                      role === r
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-600 shadow-xl"
                        : "border-slate-300 hover:border-purple-400 hover:bg-purple-50"
                    }`}
                  >
                    {r === "admin" ? <Shield size={18} className="inline mr-1" /> : <User size={18} className="inline mr-1" />}
                    {r}
                  </motion.button>
                ))}
              </div>

              {/* Admin request notice */}
              {role === "admin" && email && email !== REAL_ADMIN && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-sm"
                >
                  {requestSent
                    ? <p className="font-semibold text-green-600">✓ Admin access request sent to <strong>{REAL_ADMIN}</strong>! You'll be notified once approved.</p>
                    : <p>Selecting Admin will send a request to <strong>{REAL_ADMIN}</strong> for approval.</p>
                  }
                </motion.div>
              )}
            </motion.div>

            <motion.button
              type="submit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10">Register</span>
              <ArrowRight size={22} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-6 text-sm text-slate-600"
          >
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-purple-600 font-bold cursor-pointer hover:text-purple-700 hover:underline transition-colors"
            >
              Login
            </span>
          </motion.p>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-center mt-6 text-xs text-slate-500"
        >
          © 2024 Student Academic Growth Analyzer. All rights reserved.
        </motion.p>
      </div>
    </div>
  );
}
