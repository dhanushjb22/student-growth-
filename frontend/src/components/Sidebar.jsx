import { LayoutDashboard, BookOpen, BarChart3, Calendar, LogOut, User, Bell, Settings, Award, TrendingUp, RefreshCw } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import AccountSwitcher from "./AccountSwitcher";

export default function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      if (user?.email) {
        try {
          const res = await fetch(`http://localhost:5000/api/students/email/${user.email}`);
          const data = await res.json();
          setStudentData(data);
        } catch (error) {
          console.error('Error fetching student:', error);
        }
      }
    };
    fetchStudent();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { to: "", icon: LayoutDashboard, label: "Dashboard", end: true, gradient: "from-cyan-500 to-blue-600", bgColor: "bg-cyan-500/10" },
    { to: "subjects", icon: BookOpen, label: "Subjects", gradient: "from-purple-500 to-pink-600", bgColor: "bg-purple-500/10" },
    { to: "performance", icon: BarChart3, label: "Performance", gradient: "from-orange-500 to-red-600", bgColor: "bg-orange-500/10" },
    { to: "attendance", icon: Calendar, label: "Attendance", gradient: "from-green-500 to-emerald-600", bgColor: "bg-green-500/10" },
    { to: "profile", icon: User, label: "Profile", gradient: "from-indigo-500 to-purple-600", bgColor: "bg-indigo-500/10" },
  ];

  return (
    <motion.div 
      initial={{ x: -400, opacity: 0 }}
      animate={{ x: 0, opacity: 1, width: isExpanded ? 320 : 80 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white shadow-2xl flex flex-col relative overflow-hidden"
    >
      {/* Animated Background Layers */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-72 h-72 bg-gradient-to-br from-purple-500/30 to-pink-600/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1.3, 1, 1.3],
            rotate: [360, 180, 0],
            x: [0, -30, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.5, 1],
            x: [-100, 100, -100],
            y: [-50, 50, -50]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Animated Grid Pattern */}
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f15_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f15_1px,transparent_1px)] bg-[size:20px_20px]"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="p-6 border-b border-white/10 relative z-10"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.15 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl blur-xl opacity-75"
                animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <div className="relative bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-2xl shadow-2xl">
                <Award size={28} />
              </div>
            </motion.div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Student Portal
                  </h2>
                  <p className="text-xs text-cyan-300">Academic Dashboard</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Settings size={20} />
          </motion.button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-xl p-3 backdrop-blur-sm border border-cyan-400/30"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowSwitcher(true)}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold cursor-pointer hover:shadow-lg hover:shadow-cyan-500/50 transition-shadow overflow-hidden"
                >
                  {studentData?.profilePicture ? (
                    <img src={studentData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                      {user?.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{user?.email?.split('@')[0]}</p>
                  <p className="text-xs text-cyan-300">Student Account</p>
                </div>
                <div className="flex gap-1">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowSwitcher(true)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <RefreshCw size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <Bell size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 relative z-10 overflow-y-auto">
        {menuItems.map((item, i) => (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5, type: "spring" }}
          >
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `group relative flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? `${item.bgColor} shadow-xl backdrop-blur-xl border border-white/20` 
                    : "hover:bg-white/5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-20 rounded-2xl`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.2 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  <motion.div 
                    className={`relative p-3 rounded-xl ${
                      isActive 
                        ? `bg-gradient-to-br ${item.gradient} shadow-lg` 
                        : "bg-white/5 group-hover:bg-white/10"
                    }`}
                    whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon size={22} />
                  </motion.div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex-1"
                      >
                        <span className={`relative font-semibold text-base ${isActive ? "text-white" : "text-slate-300"}`}>
                          {item.label}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {isActive && isExpanded && (
                    <motion.div
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.gradient}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}

                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-r-full"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Quick Stats */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-4 relative z-10"
          >
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl p-4 backdrop-blur-sm border border-cyan-400/20">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={18} className="text-cyan-400" />
                <span className="text-sm font-semibold text-white">Quick Stats</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-2xl font-bold text-cyan-400">85%</div>
                  <div className="text-xs text-slate-400">Avg Score</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-2xl font-bold text-green-400">92%</div>
                  <div className="text-xs text-slate-400">Attendance</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Button */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="p-4 border-t border-white/10 relative z-10"
      >
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full relative group overflow-hidden flex items-center justify-center gap-3 px-4 py-4 rounded-2xl font-semibold transition-all duration-300"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-500 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />
          <LogOut size={20} className="relative z-10" />
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="relative z-10"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Footer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 text-center text-xs text-slate-500 relative z-10"
          >
            © 2024 Academic Tracker
          </motion.div>
        )}
      </AnimatePresence>

      <AccountSwitcher isOpen={showSwitcher} onClose={() => setShowSwitcher(false)} />
    </motion.div>
  );
}
