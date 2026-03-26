import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import DashboardHome from "./DashboardHome";
import Subjects from "./Subjects";
import Performance from "./Performance";
import Attendance from "./Attendance";
import StudentProfile from "./StudentProfile";

export default function StudentDashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      
      {/* Animated Gradient Orbs - Light Theme */}
      <motion.div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-cyan-300/40 to-blue-400/40 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.5, 1],
          x: [0, 100, 0],
          y: [0, 80, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 -left-40 w-[450px] h-[450px] bg-gradient-to-br from-purple-300/40 to-pink-400/40 rounded-full blur-3xl"
        animate={{ 
          scale: [1.4, 1, 1.4],
          x: [0, 80, 0],
          y: [0, -60, 0],
          rotate: [0, -180, -360]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-indigo-300/35 to-cyan-400/35 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.6, 1],
          x: [0, -70, 0],
          y: [0, -90, 0],
          rotate: [0, 90, 180]
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-[350px] h-[350px] bg-gradient-to-br from-pink-300/30 to-orange-300/30 rounded-full blur-3xl"
        animate={{ 
          scale: [1.3, 1, 1.3],
          rotate: [0, 270, 360],
          x: [0, 50, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-[380px] h-[380px] bg-gradient-to-br from-blue-300/35 to-purple-300/35 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.4, 1],
          x: [0, -60, 0],
          y: [0, 60, 0]
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Particles - Light Theme */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            background: `linear-gradient(135deg, ${[
              'rgba(6, 182, 212, 0.6)',
              'rgba(139, 92, 246, 0.6)',
              'rgba(236, 72, 153, 0.6)',
              'rgba(251, 146, 60, 0.6)'
            ][Math.floor(Math.random() * 4)]})`
          }}
          animate={{ 
            y: [0, -150 - Math.random() * 100, 0], 
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5 + Math.random(), 0]
          }}
          transition={{ 
            duration: 6 + Math.random() * 8, 
            repeat: Infinity, 
            delay: Math.random() * 8,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Animated Waves */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-200/30 to-transparent"
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scaleY: [1, 1.2, 1]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Animated Grid - Light */}
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf620_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf620_1px,transparent_1px)] bg-[size:40px_40px]"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Sparkle Effects */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
          }}
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 3 + Math.random() * 3, 
            repeat: Infinity, 
            delay: Math.random() * 5 
          }}
        />
      ))}
      
      {/* Sidebar */}
      <div className="relative z-20">
        <Sidebar />
      </div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 p-8 overflow-auto relative z-10"
      >
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="performance" element={<Performance />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="profile" element={<StudentProfile />} />
        </Routes>
      </motion.div>
    </div>
  );
}
