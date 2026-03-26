import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { ArrowLeft, Award, BookOpen, Calendar, Target } from "lucide-react";

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [marks, setMarks] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentData();
  }, [id]);

  const fetchStudentData = async () => {
    try {
      const [studentRes, marksRes, attendanceRes] = await Promise.all([
        api.get(`/students/${id}`),
        api.get(`/marks/student/${id}`),
        api.get(`/attendance/student/${id}`)
      ]);
      
      setStudentData(studentRes.data);
      setMarks(marksRes.data);
      setAttendance(attendanceRes.data);
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

  if (!studentData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-900 mb-2">Student Not Found</p>
        </div>
      </div>
    );
  }

  const subjectMarks = marks.map(m => ({
    name: m.subject,
    marks: m.marks,
    maxMarks: m.maxMarks
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

  const attendanceData = [
    { name: "Present", value: parseFloat(avgAttendance) },
    { name: "Absent", value: 100 - parseFloat(avgAttendance) },
  ];

  const COLORS = ["#10B981", "#EF4444"];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin")}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-slate-600" />
        </button>
        <div className="flex-1 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{studentData.name}'s Dashboard</h1>
            <p className="text-slate-600 mt-1">{studentData.rollNumber} • {studentData.department}</p>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg">
            <Award size={20} />
            <span className="font-semibold">{studentData.semester}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <StatCard icon={<Target />} title="Overall Percentage" value={`${percentage}%`} color="blue" />
        <StatCard icon={<BookOpen />} title="Total Subjects" value={marks.length} color="purple" />
        <StatCard icon={<Calendar />} title="Average Marks" value={avgMarks} color="green" />
        <StatCard icon={<Award />} title="Attendance" value={`${avgAttendance}%`} color="orange" />
      </div>

      {marks.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <Card title="Subject Performance">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={subjectMarks}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" angle={-45} textAnchor="end" height={100} fontSize={12} />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                  <Bar dataKey="marks" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Attendance Overview">
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
            </Card>
          </div>

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
                  </tr>
                </thead>
                <tbody>
                  {subjectMarks.map((s, i) => {
                    const perc = ((s.marks / s.maxMarks) * 100).toFixed(2);
                    return (
                      <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-medium">{s.name}</td>
                        <td className="py-3 px-4 text-center">{s.marks}</td>
                        <td className="py-3 px-4 text-center">{s.maxMarks}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="font-bold text-blue-600">{perc}%</span>
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      ) : (
        <Card title="No Data Available">
          <div className="text-center py-12 text-slate-400">
            <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">No marks or attendance data found</p>
          </div>
        </Card>
      )}
    </div>
  );
}

const StatCard = ({ icon, title, value, color }) => {
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

const Card = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
    <h2 className="text-lg font-bold text-slate-900 mb-4">{title}</h2>
    {children}
  </div>
);
