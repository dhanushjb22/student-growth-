import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import AdminSidebar from "../components/AdminSidebar";
import AdminStudents from "../admincomp/AdminStudents";
import AdminSubjects from "../admincomp/AdminSubjects";
import AdminMarksentry from "../admincomp/AdminMarksentry";
import AdminAttendance from "../admincomp/AdminAttendance";
import AdminStudentReports from "../admincomp/AdminStudentReports";
import AdminClassPerformance from "../admincomp/AdminClassPerformance";
import AdminAnalytics from "./AdminAnalytics";
import AdminAccessRequests from "../admincomp/AdminAccessRequests";
import AdminNotifications from "../components/AdminNotifications";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 w-80 h-80 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-72 h-72 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.4, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Sidebar */}
      <div className="relative z-20">
        <AdminSidebar />
      </div>

      <AdminNotifications />

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 p-8 overflow-auto relative z-10"
      >
        <Routes>
          <Route index element={<AdminStudents />} />
          <Route path="subjects" element={<AdminSubjects />} />
          <Route path="marks" element={<AdminMarksentry />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="reports" element={<AdminStudentReports />} />
          <Route path="class-performance" element={<AdminClassPerformance />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="access-requests" element={<AdminAccessRequests />} />
        </Routes>
      </motion.div>
    </div>
  );
}
