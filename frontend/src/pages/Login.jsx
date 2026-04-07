import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useRequests } from "../context/RequestsContext";
import { GraduationCap, Mail, Lock, ArrowRight, Sparkles, User, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addRequest } = useRequests();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [adminRequestSent, setAdminRequestSent] = useState(false);

  const REAL_ADMIN = "admin@gmail.com";

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
      const googleEmail = decoded.email;
      const googleName = decoded.name;

      if (role === "admin" && googleEmail !== REAL_ADMIN) {
        alert("You are not authorized as admin. Please request admin access.");
        return;
      }

      if (role === "student") {
        const checkRes = await fetch(`http://localhost:5000/api/students/email/${googleEmail}`);
        if (!checkRes.ok) {
          await fetch('http://localhost:5000/api/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: googleName,
              rollNumber: `STU${Date.now().toString().slice(-6)}`,
              email: googleEmail,
              department: 'General',
              semester: 'Semester 1'
            })
          });
        }
      }
      login({ email: googleEmail, role });
      navigate(role === "admin" ? "/admin" : "/student");
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleAdminRequest = () => {
    addRequest(email);
    setAdminRequestSent(true);
    setTimeout(() => setAdminRequestSent(false), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email & password");
      return;
    }

    if (role === "admin" && email !== REAL_ADMIN) {
      alert("You are not authorized as admin. Please request admin access.");
      return;
    }

    setLoading(true);

    try {
      if (role === "student") {
        const checkRes = await fetch(`http://localhost:5000/api/students/email/${email}`);
        if (!checkRes.ok) {
          const name = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
          await fetch('http://localhost:5000/api/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: name,
              rollNumber: `STU${Date.now().toString().slice(-6)}`,
              email: email,
              department: 'General',
              semester: 'Semester 1'
            })
          });
        }
      }
      setTimeout(() => {
        login({ email, role });
        navigate(role === "admin" ? "/admin" : "/student");
      }, 800);
    } catch (error) {
      console.error('Login error:', error);
      setTimeout(() => {
        login({ email, role });
        navigate(role === "admin" ? "/admin" : "/student");
      }, 800);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-0 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-0 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Elements */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ 
            y: [0, -30, 0], 
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      <div className="w-full max-w-6xl relative z-10 flex items-center justify-center gap-12">
        
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex flex-col items-start space-y-6 flex-1"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur-2xl opacity-50"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative bg-gradient-to-br from-cyan-500 to-purple-600 p-6 rounded-3xl">
              <GraduationCap size={80} className="text-white" />
            </div>
          </motion.div>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl font-black text-white mb-4 leading-tight"
            >
              Academic<br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Growth Tracker
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-slate-300 leading-relaxed"
            >
              Track your progress, analyze performance, and achieve academic excellence with data-driven insights.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex gap-8 text-slate-300"
          >
            <div>
              <div className="text-4xl font-bold text-cyan-400">500+</div>
              <div className="text-sm">Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400">95%</div>
              <div className="text-sm">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-400">24/7</div>
              <div className="text-sm">Access</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <motion.form
            onSubmit={handleLogin}
            className="bg-white/5 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl border border-white/10"
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 255, 255, 0.25)" }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-4"
              >
                <Sparkles size={40} className="text-cyan-400" />
              </motion.div>
              <h2 className="text-4xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-slate-400">Sign in to continue your journey</p>
            </div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-5"
            >
              <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <label className="block text-sm font-semibold text-slate-300 mb-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all"
                  placeholder="Enter your password"
                />
              </div>
            </motion.div>

            {/* Role Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <label className="block text-sm font-semibold text-slate-300 mb-3">Login As</label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  onClick={() => setRole("student")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                    role === "student"
                      ? "bg-gradient-to-br from-cyan-500 to-blue-600 border-cyan-400 text-white shadow-lg shadow-cyan-500/50"
                      : "bg-white/5 border-white/20 text-slate-400 hover:border-cyan-400/50"
                  }`}
                >
                  <User size={24} className="mx-auto mb-1" />
                  <div className="text-sm font-bold">Student</div>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => {
                    setRole("admin");
                    if (email && email !== REAL_ADMIN) {
                      addRequest(email);
                      setAdminRequestSent(true);
                      setTimeout(() => setAdminRequestSent(false), 3000);
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                    role === "admin"
                      ? "bg-gradient-to-br from-purple-500 to-pink-600 border-purple-400 text-white shadow-lg shadow-purple-500/50"
                      : "bg-white/5 border-white/20 text-slate-400 hover:border-purple-400/50"
                  }`}
                >
                  <Shield size={24} className="mx-auto mb-1" />
                  <div className="text-sm font-bold">Admin</div>
                </motion.button>
              </div>
            </motion.div>

            {/* Admin Request Banner */}
            {role === "admin" && email && email !== REAL_ADMIN && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-sm"
              >
                <p className="mb-2">Only <span className="font-bold text-yellow-200">{REAL_ADMIN}</span> is the real admin.</p>
                {adminRequestSent ? (
                  <p className="text-green-400 font-semibold">✓ Request sent to admin!</p>
                ) : (
                  <button
                    type="button"
                    onClick={handleAdminRequest}
                    className="underline text-yellow-200 hover:text-white font-semibold"
                  >
                    Request Admin Access →
                  </button>
                )}
              </motion.div>
            )}

            {/* Login Button */}
            <motion.button
              type="submit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">{loading ? "Signing In..." : "Sign In"}</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/20"></div>
              <span className="text-slate-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>

            {/* Google Login */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center"
            >
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log('Login Failed')}
                theme="filled_black"
                size="large"
                text="continue_with"
                shape="rectangular"
              />
            </motion.div>

            {/* Register Link */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mt-6 text-slate-400"
            >
              Don't have an account?{" "}
              <Link to="/register" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors">
                Create Account
              </Link>
            </motion.p>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-6 text-xs text-slate-500"
          >
            © 2024 Academic Growth Tracker. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
