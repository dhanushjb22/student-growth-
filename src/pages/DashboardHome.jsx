import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";
import { TrendingUp, Award, BookOpen, Calendar, Target, AlertCircle, Lightbulb, CheckCircle, AlertTriangle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function DashboardHome() {
  const { user } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [marks, setMarks] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetchStudentData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  const fetchStudentData = async () => {
    try {
      const studentRes = await api.get(`/students/email/${user.email}`);
      const student = studentRes.data;
      
      if (student && student._id) {
        setStudentData(student);
        const [marksRes, attendanceRes] = await Promise.all([
          api.get(`/marks/student/${student._id}`),
          api.get(`/attendance/student/${student._id}`)
        ]);
        setMarks(marksRes.data);
        setAttendance(attendanceRes.data);
      } else {
        setError("No student found with this email");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.response?.data?.message || "Failed to fetch student data");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-2xl font-bold text-blue-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !studentData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center max-w-md">
          <AlertCircle className="text-orange-500 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Student Profile Not Found</h2>
          <p className="text-slate-600 mb-2">No student record found for: <strong>{user?.email}</strong></p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4 text-left">
            <p className="text-sm text-slate-700 mb-2"><strong>To fix this:</strong></p>
            <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
              <li>Ask admin to add your student profile</li>
              <li>Ensure admin uses this exact email: <strong className="text-blue-600">{user?.email}</strong></li>
              <li>After admin adds you, click Retry below</li>
            </ol>
          </div>
          <button
            onClick={fetchStudentData}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const subjectMarks = marks.map(m => ({
    name: m.subject,
    marks: m.marks,
    maxMarks: m.maxMarks,
    percentage: ((m.marks / m.maxMarks) * 100).toFixed(1)
  }));

  const avgMarks = marks.length > 0 
    ? (marks.reduce((sum, m) => sum + m.marks, 0) / marks.length).toFixed(2)
    : 0;

  const totalMarks = marks.reduce((sum, m) => sum + m.marks, 0);
  const totalMaxMarks = marks.reduce((sum, m) => sum + m.maxMarks, 0);
  const percentage = totalMaxMarks > 0 ? ((totalMarks / totalMaxMarks) * 100).toFixed(2) : 0;

  const avgAttendance = attendance.length > 0
    ? (attendance.reduce((sum, a) => sum + a.percentage, 0) / attendance.length).toFixed(1)
    : 0;

  // Academic Growth Analysis
  const strongSubjects = subjectMarks.filter(s => parseFloat(s.percentage) >= 80);
  const weakSubjects = subjectMarks.filter(s => parseFloat(s.percentage) < 60);
  const averageSubjects = subjectMarks.filter(s => parseFloat(s.percentage) >= 60 && parseFloat(s.percentage) < 80);

  // Growth Suggestions
  const suggestions = [];
  
  if (parseFloat(percentage) >= 90) {
    suggestions.push({ type: "success", text: "Excellent performance! Keep up the outstanding work!" });
  } else if (parseFloat(percentage) >= 75) {
    suggestions.push({ type: "info", text: "Good performance! Focus on weak areas to reach excellence." });
  } else {
    suggestions.push({ type: "warning", text: "Need improvement. Follow the suggestions below to boost your grades." });
  }

  if (weakSubjects.length > 0) {
    suggestions.push({ 
      type: "warning", 
      text: `Focus on: ${weakSubjects.map(s => s.name).join(", ")}. Consider extra study sessions.` 
    });
  }

  if (parseFloat(avgAttendance) < 75) {
    suggestions.push({ 
      type: "warning", 
      text: "Attendance is below 75%. Regular attendance improves understanding and grades." 
    });
  }

  if (strongSubjects.length > 0) {
    suggestions.push({ 
      type: "success", 
      text: `Strong in: ${strongSubjects.map(s => s.name).join(", ")}. Great job!` 
    });
  }

  suggestions.push({ 
    type: "info", 
    text: "Create a study schedule: 2 hours daily for weak subjects, 1 hour for revision." 
  });

  suggestions.push({ 
    type: "info", 
    text: "Practice previous year questions and take mock tests regularly." 
  });

  // Radar chart data
  const radarData = subjectMarks.map(s => ({
    subject: s.name.substring(0, 10),
    score: parseFloat(s.percentage),
    fullMark: 100
  }));

  const attendanceData = [
    { name: "Present", value: parseFloat(avgAttendance) },
    { name: "Absent", value: 100 - parseFloat(avgAttendance) },
  ];

  const COLORS = ["#10B981", "#EF4444"];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 -left-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 -right-20 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"
        />
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative space-y-6 p-6"
      >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center"
      >
        <motion.div
          initial={{ x: -30 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          {/* Animated Profile Picture */}
          <motion.div
            whileHover={{ scale: 1.15, rotate: 360 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-xl opacity-60"
              animate={{ 
                scale: [1, 1.4, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            {studentData.profilePicture ? (
              <motion.img
                src={studentData.profilePicture}
                alt="Profile"
                className="relative w-20 h-20 rounded-full object-cover border-4 border-white shadow-2xl"
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(6, 182, 212, 0.5)',
                    '0 0 40px rgba(59, 130, 246, 0.8)',
                    '0 0 20px rgba(6, 182, 212, 0.5)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            ) : (
              <motion.div
                className="relative w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-2xl border-4 border-white cursor-pointer"
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(6, 182, 212, 0.5)',
                    '0 0 40px rgba(59, 130, 246, 0.8)',
                    '0 0 20px rgba(6, 182, 212, 0.5)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {studentData.name.charAt(0)}
              </motion.div>
            )}
            <motion.div
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome Back, {studentData.name}!</h1>
            <p className="text-slate-600 mt-1">{studentData.rollNumber} • {studentData.department}</p>
          </div>
        </motion.div>
        <motion.div 
          initial={{ x: 30 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchStudentData}
            className="flex items-center gap-2 bg-white border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
          >
            <TrendingUp size={18} />
            Refresh
          </motion.button>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg"
          >
            <Award size={20} />
            <span className="font-semibold">{studentData.semester}</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid md:grid-cols-4 gap-6"
      >
        <StatCard icon={<Target />} title="Overall Percentage" value={`${percentage}%`} color="blue" delay={0.1} />
        <StatCard icon={<BookOpen />} title="Total Subjects" value={marks.length} color="purple" delay={0.2} />
        <StatCard icon={<Calendar />} title="Attendance" value={`${avgAttendance}%`} color="green" delay={0.3} />
        <StatCard icon={<TrendingUp />} title="Average Marks" value={avgMarks} color="orange" delay={0.4} />
      </motion.div>

      {/* Academic Growth Suggestions */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card title="📈 Academic Growth Suggestions" icon={<Lightbulb className="text-yellow-500" />}>
          <div className="space-y-3">
            {suggestions.map((suggestion, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`flex items-start gap-3 p-4 rounded-lg ${
                  suggestion.type === "success" ? "bg-green-50 border border-green-200" :
                  suggestion.type === "warning" ? "bg-orange-50 border border-orange-200" :
                  "bg-blue-50 border border-blue-200"
                }`}
              >
                {suggestion.type === "success" ? <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} /> :
                 suggestion.type === "warning" ? <AlertTriangle className="text-orange-600 flex-shrink-0 mt-0.5" size={20} /> :
                 <Lightbulb className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />}
                <p className="text-sm text-slate-700">{suggestion.text}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {marks.length > 0 ? (
        <>
          {/* Performance Analysis */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid md:grid-cols-3 gap-6"
          >
            <AnimatedCard title="Strong Subjects" icon={<CheckCircle className="text-green-600" />} delay={0.1}>
              {strongSubjects.length > 0 ? (
                strongSubjects.map((s, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex justify-between items-center py-2 border-b last:border-none"
                  >
                    <span className="font-medium text-slate-700">{s.name}</span>
                    <span className="font-bold text-green-600">{s.percentage}%</span>
                  </motion.div>
                ))
              ) : (
                <p className="text-slate-500 text-sm">No subjects above 80%</p>
              )}
            </AnimatedCard>

            <AnimatedCard title="Average Subjects" icon={<Target className="text-blue-600" />} delay={0.2}>
              {averageSubjects.length > 0 ? (
                averageSubjects.map((s, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex justify-between items-center py-2 border-b last:border-none"
                  >
                    <span className="font-medium text-slate-700">{s.name}</span>
                    <span className="font-bold text-blue-600">{s.percentage}%</span>
                  </motion.div>
                ))
              ) : (
                <p className="text-slate-500 text-sm">No subjects in 60-80% range</p>
              )}
            </AnimatedCard>

            <AnimatedCard title="Need Improvement" icon={<AlertTriangle className="text-orange-600" />} delay={0.3}>
              {weakSubjects.length > 0 ? (
                weakSubjects.map((s, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex justify-between items-center py-2 border-b last:border-none"
                  >
                    <span className="font-medium text-slate-700">{s.name}</span>
                    <span className="font-bold text-orange-600">{s.percentage}%</span>
                  </motion.div>
                ))
              ) : (
                <p className="text-green-600 text-sm font-semibold">All subjects performing well! 🎉</p>
              )}
            </AnimatedCard>
          </motion.div>

          {/* Charts */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <AnimatedCard title="Subject Performance" delay={0.1}>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={subjectMarks}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" angle={-45} textAnchor="end" height={100} fontSize={12} />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                  <Bar dataKey="marks" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </AnimatedCard>

            <AnimatedCard title="Skills Radar" delay={0.2}>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={12} />
                  <PolarRadiusAxis stroke="#64748b" />
                  <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </AnimatedCard>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <AnimatedCard title="Attendance Overview" delay={0.1}>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={attendanceData} innerRadius={60} outerRadius={80} dataKey="value" label>
                    {attendanceData.map((e, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-center text-2xl font-bold text-slate-900 mt-4">{avgAttendance}% Average</p>
            </AnimatedCard>

            <AnimatedCard title="Subject Marks Breakdown" delay={0.2}>
              <div className="space-y-4">
                {subjectMarks.map((s, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + i * 0.1 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-slate-700">{s.name}</span>
                      <span className="font-bold text-blue-600">{s.marks}/{s.maxMarks}</span>
                    </div>
                    <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${s.percentage}%` }}
                        transition={{ duration: 1, delay: 1.2 + i * 0.1 }}
                        className={`h-3 rounded-full ${
                          parseFloat(s.percentage) >= 80 ? "bg-gradient-to-r from-green-500 to-green-600" :
                          parseFloat(s.percentage) >= 60 ? "bg-gradient-to-r from-blue-500 to-blue-600" :
                          "bg-gradient-to-r from-orange-500 to-red-600"
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedCard>
          </motion.div>

          {/* Detailed Records */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <Card title="Detailed Academic Records">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Subject</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700">Marks</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700">Max Marks</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700">Percentage</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700">Grade</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjectMarks.map((s, i) => {
                      const perc = parseFloat(s.percentage);
                      return (
                        <motion.tr 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 + i * 0.1 }}
                          whileHover={{ backgroundColor: "#f8fafc", scale: 1.01 }}
                          className="border-b border-slate-100 transition-colors"
                        >
                          <td className="py-3 px-4 font-medium">{s.name}</td>
                          <td className="py-3 px-4 text-center">{s.marks}</td>
                          <td className="py-3 px-4 text-center">{s.maxMarks}</td>
                          <td className="py-3 px-4 text-center">
                            <span className="font-bold text-blue-600">{s.percentage}%</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              perc >= 90 ? 'bg-green-100 text-green-700' :
                              perc >= 80 ? 'bg-blue-100 text-blue-700' :
                              perc >= 60 ? 'bg-orange-100 text-orange-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {perc >= 90 ? 'A+' : perc >= 80 ? 'A' : perc >= 60 ? 'B' : 'C'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`text-xs font-semibold ${
                              perc >= 80 ? 'text-green-600' :
                              perc >= 60 ? 'text-blue-600' :
                              'text-orange-600'
                            }`}>
                              {perc >= 80 ? 'Excellent' : perc >= 60 ? 'Good' : 'Needs Work'}
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card title="No Marks Data">
            <div className="text-center py-12 text-slate-400">
              <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">No marks have been entered yet</p>
              <p className="text-sm">Contact your admin to add your marks</p>
            </div>
          </Card>
        </motion.div>
      )}
      </motion.div>
    </div>
  );
}

const StatCard = ({ icon, title, value, color, delay }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.08, y: -8 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/60 p-6 hover:shadow-2xl transition-all cursor-pointer"
    >
      <motion.div 
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
        className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]} text-white mb-4 shadow-lg`}
      >
        {icon}
      </motion.div>
      <p className="text-slate-600 text-sm mb-1">{title}</p>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">{value}</h3>
    </motion.div>
  );
};

const Card = ({ title, children, icon }) => (
  <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-white/50 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]">
    <h2 className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4 flex items-center gap-2">
      {icon}
      {title}
    </h2>
    {children}
  </div>
);

const AnimatedCard = ({ title, children, icon, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    whileHover={{ scale: 1.02, y: -5 }}
    className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-white/50 p-6 hover:shadow-2xl transition-all"
  >
    <h2 className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4 flex items-center gap-2">
      {icon}
      {title}
    </h2>
    {children}
  </motion.div>
);
