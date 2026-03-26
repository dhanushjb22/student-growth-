import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Users, BookOpen, TrendingUp, Calendar } from "lucide-react";
import api from "../api/axios";

export default function AdminAnalytics() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalSubjects: 0,
    avgAttendance: 0,
    avgPerformance: 0
  });
  const [departmentData, setDepartmentData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [studentsRes, subjectsRes] = await Promise.all([
        api.get("/students"),
        api.get("/subjects")
      ]);

      const students = studentsRes.data;
      setStats({
        totalStudents: students.length,
        totalSubjects: subjectsRes.data.length,
        avgAttendance: 82,
        avgPerformance: 75
      });

      // Department distribution
      const deptCount = students.reduce((acc, s) => {
        acc[s.department] = (acc[s.department] || 0) + 1;
        return acc;
      }, {});
      setDepartmentData(Object.entries(deptCount).map(([name, value]) => ({ name, value })));

      // Performance trend
      setPerformanceData([
        { month: "Jan", performance: 70 },
        { month: "Feb", performance: 72 },
        { month: "Mar", performance: 75 },
        { month: "Apr", performance: 78 },
        { month: "May", performance: 80 }
      ]);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  const COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
      >
        Analytics Dashboard
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard icon={<Users />} title="Total Students" value={stats.totalStudents} color="purple" delay={0.1} />
        <StatCard icon={<BookOpen />} title="Total Subjects" value={stats.totalSubjects} color="blue" delay={0.2} />
        <StatCard icon={<Calendar />} title="Avg Attendance" value={`${stats.avgAttendance}%`} color="green" delay={0.3} />
        <StatCard icon={<TrendingUp />} title="Avg Performance" value={`${stats.avgPerformance}%`} color="orange" delay={0.4} />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-white/50 p-6"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-4">Department Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={departmentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-white/50 p-6"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-4">Performance Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="performance" stroke="#8b5cf6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}

const StatCard = ({ icon, title, value, color, delay }) => {
  const colorClasses = {
    purple: "from-purple-500 to-purple-600",
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/60 p-6 cursor-pointer"
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]} text-white mb-4 shadow-lg`}
      >
        {icon}
      </motion.div>
      <p className="text-slate-600 text-sm mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
    </motion.div>
  );
};
