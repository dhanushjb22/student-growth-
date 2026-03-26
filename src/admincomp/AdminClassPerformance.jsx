import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import { Users, Award, BarChart3, TrendingUp } from "lucide-react";

export default function AdminClassPerformance() {
  const [students, setStudents] = useState([]);
  const [allMarks, setAllMarks] = useState([]);
  const [allAttendance, setAllAttendance] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [studentsRes, marksRes, attendanceRes] = await Promise.all([
        api.get("/students"),
        api.get("/marks/student/all").catch(() => ({ data: [] })),
        api.get("/attendance/student/all").catch(() => ({ data: [] }))
      ]);

      setStudents(studentsRes.data);
      
      // Fetch marks for each student
      const marksPromises = studentsRes.data.map(s => 
        api.get(`/marks/student/${s._id}`).catch(() => ({ data: [] }))
      );
      const marksResults = await Promise.all(marksPromises);
      setAllMarks(marksResults.map(r => r.data));

      // Fetch attendance for each student
      const attendancePromises = studentsRes.data.map(s =>
        api.get(`/attendance/student/${s._id}`).catch(() => ({ data: [] }))
      );
      const attendanceResults = await Promise.all(attendancePromises);
      setAllAttendance(attendanceResults.map(r => r.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateStudentStats = (studentIndex) => {
    const marks = allMarks[studentIndex] || [];
    const attendance = allAttendance[studentIndex] || [];

    if (marks.length === 0) return { percentage: 0, grade: "N/A", attendance: 0 };

    const totalMarks = marks.reduce((sum, m) => sum + m.marks, 0);
    const totalMaxMarks = marks.reduce((sum, m) => sum + m.maxMarks, 0);
    const percentage = totalMaxMarks > 0 ? ((totalMarks / totalMaxMarks) * 100).toFixed(2) : 0;
    
    const grade = percentage >= 90 ? "A+" : percentage >= 80 ? "A" : percentage >= 70 ? "B" : percentage >= 60 ? "C" : "D";
    
    const avgAttendance = attendance.length > 0
      ? (attendance.reduce((sum, a) => sum + a.percentage, 0) / attendance.length).toFixed(1)
      : 0;

    return { percentage, grade, attendance: avgAttendance };
  };

  const studentsWithStats = students.map((student, index) => ({
    ...student,
    ...calculateStudentStats(index)
  }));

  const classAverage = studentsWithStats.length > 0
    ? (studentsWithStats.reduce((sum, s) => sum + parseFloat(s.percentage), 0) / studentsWithStats.length).toFixed(2)
    : 0;

  const avgAttendance = studentsWithStats.length > 0
    ? (studentsWithStats.reduce((sum, s) => sum + parseFloat(s.attendance), 0) / studentsWithStats.length).toFixed(1)
    : 0;

  const gradeDistribution = {
    "A+": studentsWithStats.filter(s => s.grade === "A+").length,
    "A": studentsWithStats.filter(s => s.grade === "A").length,
    "B": studentsWithStats.filter(s => s.grade === "B").length,
    "C": studentsWithStats.filter(s => s.grade === "C").length,
    "D": studentsWithStats.filter(s => s.grade === "D").length,
  };

  const topPerformers = [...studentsWithStats]
    .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <BarChart3 className="text-blue-600" size={32} />
            Class Performance Overview
          </h1>
          <p className="text-slate-600 mt-1">Comprehensive class analytics</p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Total Students" value={students.length} color="blue" icon={<Users />} />
        <StatCard title="Class Average" value={`${classAverage}%`} color="green" icon={<Award />} />
        <StatCard title="Avg Attendance" value={`${avgAttendance}%`} color="orange" icon={<TrendingUp />} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Grade Distribution">
          {Object.entries(gradeDistribution).map(([grade, count]) => (
            <GradeBar
              key={grade}
              label={`Grade ${grade}`}
              count={`${count} students`}
              percent={students.length > 0 ? `${((count / students.length) * 100).toFixed(0)}%` : "0%"}
            />
          ))}
        </Card>

        <Card title="Top 5 Performers">
          {topPerformers.map((s, i) => (
            <div key={i} className="flex justify-between items-center py-3 border-b last:border-none">
              <div className="flex gap-3 items-center">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{s.name}</p>
                  <p className="text-xs text-slate-500">{s.rollNumber}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-blue-600">{s.percentage}%</p>
                <p className="text-xs text-slate-500">Grade {s.grade}</p>
              </div>
            </div>
          ))}
        </Card>
      </div>

      <Card title="All Students Performance">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Roll Number</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">Percentage</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">Grade</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {studentsWithStats.map((s, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium">{s.name}</td>
                  <td className="py-3 px-4">{s.rollNumber}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-bold text-blue-600">{s.percentage}%</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      s.grade === "A+" || s.grade === "A" ? "bg-green-100 text-green-700" :
                      s.grade === "B" ? "bg-blue-100 text-blue-700" :
                      s.grade === "C" ? "bg-orange-100 text-orange-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {s.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">{s.attendance}%</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

const StatCard = ({ title, value, color, icon }) => {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`bg-gradient-to-br ${colors[color]} text-white p-6 rounded-xl shadow-lg`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <h2 className="text-3xl font-bold mt-1">{value}</h2>
        </div>
        <div className="opacity-80">{icon}</div>
      </div>
    </motion.div>
  );
};

const Card = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
    <h3 className="font-bold text-lg mb-4 text-slate-900">{title}</h3>
    {children}
  </div>
);

const GradeBar = ({ label, count, percent }) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm mb-2">
      <span className="font-medium text-slate-700">{label}</span>
      <span className="text-slate-600">{count}</span>
    </div>
    <div className="bg-slate-200 h-3 rounded-full overflow-hidden">
      <div
        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
        style={{ width: percent }}
      />
    </div>
  </div>
);
