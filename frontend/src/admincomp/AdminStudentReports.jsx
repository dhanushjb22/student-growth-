import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import { FileText, User, TrendingUp, Award } from "lucide-react";

export default function AdminStudentReports() {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [marks, setMarks] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (student) {
      fetchStudentDetails();
    }
  }, [student]);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchStudentDetails = async () => {
    try {
      const [studentRes, marksRes, attendanceRes] = await Promise.all([
        api.get(`/students/${student}`),
        api.get(`/marks/student/${student}`),
        api.get(`/attendance/student/${student}`)
      ]);
      
      setStudentData(studentRes.data);
      setMarks(marksRes.data);
      setAttendance(attendanceRes.data);
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  const calculateStats = () => {
    if (marks.length === 0) return { percentage: 0, grade: "N/A", avgAttendance: 0 };

    const totalMarks = marks.reduce((sum, m) => sum + m.marks, 0);
    const totalMaxMarks = marks.reduce((sum, m) => sum + m.maxMarks, 0);
    const percentage = totalMaxMarks > 0 ? ((totalMarks / totalMaxMarks) * 100).toFixed(2) : 0;
    
    const grade = percentage >= 90 ? "A+" : percentage >= 80 ? "A" : percentage >= 70 ? "B" : percentage >= 60 ? "C" : "D";
    
    const avgAttendance = attendance.length > 0 
      ? (attendance.reduce((sum, a) => sum + a.percentage, 0) / attendance.length).toFixed(1)
      : 0;

    return { percentage, grade, avgAttendance };
  };

  const stats = calculateStats();

  const strongSubjects = marks.filter(m => (m.marks / m.maxMarks) * 100 >= 80);
  const weakSubjects = marks.filter(m => (m.marks / m.maxMarks) * 100 < 80);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <FileText className="text-blue-600" size={32} />
            Individual Student Report
          </h1>
          <p className="text-slate-600 mt-1">View detailed student performance</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 max-w-md"
      >
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
          <User size={16} />
          Select Student
        </label>
        <select
          value={student}
          onChange={(e) => setStudent(e.target.value)}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        >
          <option value="">Choose a student</option>
          {students.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} - {s.rollNumber}
            </option>
          ))}
        </select>
      </motion.div>

      {studentData && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-2xl shadow-xl"
          >
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <h2 className="text-2xl font-bold">{studentData.name}</h2>
                <p className="text-sm opacity-80 mt-1">Roll Number</p>
                <p className="font-semibold">{studentData.rollNumber}</p>
              </div>

              <div>
                <p className="opacity-80">Department</p>
                <h3 className="text-xl font-bold">{studentData.department}</h3>
              </div>

              <div>
                <p className="opacity-80">Current Semester</p>
                <h3 className="text-xl font-bold">{studentData.semester}</h3>
              </div>

              <div>
                <p className="opacity-80">Overall Grade</p>
                <h3 className="text-4xl font-bold">{stats.grade}</h3>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <StatCard title="Overall Percentage" value={`${stats.percentage}%`} color="green" icon={<Award />} />
            <StatCard title="Total Subjects" value={marks.length} color="blue" icon={<FileText />} />
            <StatCard title="Avg Attendance" value={`${stats.avgAttendance}%`} color="orange" icon={<TrendingUp />} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card title="Strong Subjects" color="green">
              {strongSubjects.length > 0 ? (
                strongSubjects.map((m, i) => (
                  <Item key={i} name={m.subject} percent={`${((m.marks / m.maxMarks) * 100).toFixed(1)}%`} />
                ))
              ) : (
                <p className="text-slate-500">No data available</p>
              )}
            </Card>

            <Card title="Subjects Needing Improvement" color="red">
              {weakSubjects.length > 0 ? (
                weakSubjects.map((m, i) => (
                  <Item key={i} name={m.subject} percent={`${((m.marks / m.maxMarks) * 100).toFixed(1)}%`} />
                ))
              ) : (
                <p className="text-slate-500">All subjects performing well!</p>
              )}
            </Card>
          </div>

          <Card title="Semester-wise Performance">
            <div className="grid md:grid-cols-3 gap-4">
              {attendance.map((a, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <p className="text-slate-600">{a.semester}</p>
                  <h2 className="text-2xl font-bold text-blue-600">{a.percentage}%</h2>
                  <p className="text-slate-500 text-sm">Attendance</p>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

const StatCard = ({ title, value, color, icon }) => {
  const colors = {
    green: "from-green-500 to-green-600 border-green-300",
    blue: "from-blue-500 to-blue-600 border-blue-300",
    orange: "from-orange-500 to-orange-600 border-orange-300"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
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

const Card = ({ title, children, color }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
    <h3 className="font-bold text-lg mb-4 text-slate-900">{title}</h3>
    <div className={`p-4 rounded-lg ${color === "green" ? "bg-green-50" : "bg-red-50"}`}>
      {children}
    </div>
  </div>
);

const Item = ({ name, percent }) => (
  <div className="flex justify-between py-2 border-b last:border-none">
    <span className="font-medium">{name}</span>
    <span className="font-bold text-blue-600">{percent}</span>
  </div>
);
