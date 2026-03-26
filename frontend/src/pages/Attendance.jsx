import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Attendance() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const studentRes = await api.get(`/students/email/${user.email}`);
      if (studentRes.data && studentRes.data._id) {
        const attendanceRes = await api.get(`/attendance/student/${studentRes.data._id}`);
        setAttendance(attendanceRes.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-bold text-blue-600">Loading...</div>
      </div>
    );
  }

  const avgAttendance = attendance.length > 0 
    ? (attendance.reduce((sum, a) => sum + a.percentage, 0) / attendance.length).toFixed(1)
    : 0;
  
  const pieData = [
    { name: "Present", value: parseFloat(avgAttendance) },
    { name: "Absent", value: 100 - parseFloat(avgAttendance) }
  ];

  const barData = attendance.map(a => ({
    semester: a.semester,
    percentage: a.percentage
  }));

  const COLORS = ["#10B981", "#EF4444"];

  const getStatus = (percentage) => {
    if (percentage >= 90) return { text: "Excellent", color: "green" };
    if (percentage >= 75) return { text: "Good", color: "blue" };
    if (percentage >= 60) return { text: "Average", color: "orange" };
    return { text: "Poor", color: "red" };
  };

  const status = getStatus(parseFloat(avgAttendance));

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Calendar className="text-blue-600" size={32} />
            My Attendance
          </h1>
          <p className="text-slate-600 mt-1">Track your attendance across semesters</p>
        </div>
        {attendance.length > 0 && (
          <div className={`bg-gradient-to-r ${
            status.color === "green" ? "from-green-500 to-green-600" :
            status.color === "blue" ? "from-blue-500 to-blue-600" :
            status.color === "orange" ? "from-orange-500 to-orange-600" :
            "from-red-500 to-red-600"
          } text-white px-6 py-3 rounded-xl shadow-lg`}>
            <p className="text-sm opacity-90">Overall Attendance</p>
            <p className="text-2xl font-bold">{avgAttendance}%</p>
          </div>
        )}
      </motion.div>

      {attendance.length > 0 && (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            <StatCard 
              icon={<CheckCircle />} 
              title="Average Attendance" 
              value={`${avgAttendance}%`} 
              color="green" 
            />
            <StatCard 
              icon={<Calendar />} 
              title="Total Semesters" 
              value={attendance.length} 
              color="blue" 
            />
            <StatCard 
              icon={<TrendingUp />} 
              title="Status" 
              value={status.text} 
              color={status.color} 
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
            >
              <h2 className="text-lg font-bold text-slate-900 mb-4">Attendance Overview</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={70}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center mt-4">
                <p className="text-3xl font-bold text-slate-900">{avgAttendance}%</p>
                <p className="text-slate-600">Average Attendance</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
            >
              <h2 className="text-lg font-bold text-slate-900 mb-4">Semester-wise Attendance</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="semester" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="percentage" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <h2 className="text-lg font-bold text-slate-900 mb-4">Detailed Attendance Records</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {attendance.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className={`p-6 rounded-xl border-2 ${
                    a.percentage >= 90 ? "bg-green-50 border-green-200" :
                    a.percentage >= 75 ? "bg-blue-50 border-blue-200" :
                    a.percentage >= 60 ? "bg-orange-50 border-orange-200" :
                    "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-slate-900">{a.semester}</h3>
                    {a.percentage >= 75 ? (
                      <CheckCircle className="text-green-600" size={24} />
                    ) : (
                      <XCircle className="text-red-600" size={24} />
                    )}
                  </div>
                  <p className={`text-4xl font-bold ${
                    a.percentage >= 90 ? "text-green-600" :
                    a.percentage >= 75 ? "text-blue-600" :
                    a.percentage >= 60 ? "text-orange-600" :
                    "text-red-600"
                  }`}>
                    {a.percentage}%
                  </p>
                  <p className="text-sm text-slate-600 mt-2">
                    {a.percentage >= 90 ? "Excellent Attendance" :
                     a.percentage >= 75 ? "Good Attendance" :
                     a.percentage >= 60 ? "Average Attendance" :
                     "Poor Attendance - Improve!"}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {parseFloat(avgAttendance) < 75 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6"
            >
              <div className="flex items-start gap-3">
                <XCircle className="text-orange-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-orange-900 mb-2">⚠️ Attendance Alert</h3>
                  <p className="text-orange-800 text-sm">
                    Your attendance is below 75%. This may affect your eligibility for exams. 
                    Please attend classes regularly to improve your attendance percentage.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}

const StatCard = ({ icon, title, value, color }) => {
  const colorClasses = {
    green: "from-green-500 to-green-600",
    blue: "from-blue-500 to-blue-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all"
    >
      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]} text-white mb-4`}>
        {icon}
      </div>
      <p className="text-slate-600 text-sm mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
    </motion.div>
  );
};
