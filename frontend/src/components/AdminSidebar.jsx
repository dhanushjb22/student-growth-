import {
  Users,
  BookOpen,
  ClipboardList,
  Calendar,
  FileText,
  BarChart2,
  LogOut,
  Shield,
  TrendingUp,
  UserCheck
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const update = () => {
      const reqs = JSON.parse(localStorage.getItem("adminAccessRequests") || "[]");
      setPendingCount(reqs.filter((r) => r.status === "pending").length);
    };
    update();
    window.addEventListener("storage", update);
    const interval = setInterval(update, 2000);
    return () => { window.removeEventListener("storage", update); clearInterval(interval); };
  }, []);

  const menuItems = [
    { to: "/admin", icon: Users, label: "Students", end: true, gradient: "from-blue-500 to-cyan-600" },
    { to: "/admin/subjects", icon: BookOpen, label: "Subjects", gradient: "from-purple-500 to-pink-600" },
    { to: "/admin/marks", icon: ClipboardList, label: "Marks Entry", gradient: "from-orange-500 to-amber-600" },
    { to: "/admin/attendance", icon: Calendar, label: "Attendance", gradient: "from-green-500 to-emerald-600" },
    { to: "/admin/reports", icon: FileText, label: "Student Reports", gradient: "from-indigo-500 to-purple-600" },
    { to: "/admin/class-performance", icon: BarChart2, label: "Class Performance", gradient: "from-pink-500 to-rose-600" },
    { to: "/admin/analytics", icon: TrendingUp, label: "Analytics", gradient: "from-teal-500 to-cyan-600" },
    { to: "/admin/access-requests", icon: UserCheck, label: "Access Requests", gradient: "from-amber-500 to-orange-600", badge: pendingCount },
  ];

  return (
    <motion.div 
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className="w-72 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white shadow-2xl flex flex-col relative overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, 30, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -20, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="p-6 border-b border-white/10 relative z-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div 
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl blur-lg opacity-75"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="relative bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-xl shadow-lg">
              <Shield size={24} />
            </div>
          </motion.div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Admin Portal
            </h2>
            <p className="text-xs text-slate-400">Management Dashboard</p>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 relative z-10 overflow-y-auto">
        {menuItems.map((item, i) => (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
          >
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-white/10 shadow-lg backdrop-blur-xl" 
                    : "hover:bg-white/5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="activeAdminTab"
                      className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-20 rounded-xl`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.2 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <motion.div 
                    className={`relative p-2 rounded-lg ${
                      isActive 
                        ? `bg-gradient-to-br ${item.gradient} shadow-lg` 
                        : "bg-white/5 group-hover:bg-white/10"
                    }`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon size={18} />
                  </motion.div>
                  <span className={`relative font-medium ${isActive ? "text-white" : "text-slate-300"}`}>
                    {item.label}
                  </span>
                  {item.badge > 0 && (
                    <span className="ml-auto bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {isActive && !item.badge && (
                    <motion.div
                      className={`ml-auto w-2 h-2 rounded-full bg-gradient-to-r ${item.gradient}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Logout Button */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="p-4 border-t border-white/10 relative z-10"
      >
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full relative group overflow-hidden flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold transition-all duration-300"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-500 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />
          <LogOut size={18} className="relative z-10" />
          <span className="relative z-10">Logout</span>
        </motion.button>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="p-4 text-center text-xs text-slate-500 relative z-10"
      >
        © 2024 Academic Tracker
      </motion.div>
    </motion.div>
  );
}
