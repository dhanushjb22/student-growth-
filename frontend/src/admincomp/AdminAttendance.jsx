import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import { Calendar, Save, User } from "lucide-react";

export default function AdminAttendance() {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState("");
  const [semester, setSemester] = useState("Semester 1");
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const saveAttendance = async () => {
    if (!student) return alert("Select a student");

    try {
      await api.post("/attendance", {
        studentId: student,
        semester,
        percentage: parseInt(percentage)
      });
      alert("Attendance saved successfully!");
      setPercentage(0);
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("Error saving attendance");
    }
  };

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
            Record Attendance
          </h1>
          <p className="text-slate-600 mt-1">Track student attendance by semester</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
      >
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <User size={16} />
              Select Student
            </label>
            <select
              value={student}
              onChange={(e) => setStudent(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">Choose Student</option>
              {students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} - {s.rollNumber}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <Calendar size={16} />
              Semester
            </label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                <option key={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
          <p className="mb-4 text-slate-700 font-semibold text-lg">
            Attendance Percentage: <span className="text-blue-600">{percentage}%</span>
          </p>

          <input
            type="range"
            min="0"
            max="100"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />

          <div className="flex justify-between text-slate-500 text-sm mt-2">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>

          <div className="bg-white p-4 rounded-lg mt-6">
            <p className="text-slate-700">
              Selected: <span className="font-bold text-blue-600">{percentage}%</span> attendance for <span className="font-bold">{semester}</span>
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={saveAttendance}
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <Save size={20} />
          Save Attendance
        </motion.button>
      </motion.div>
    </div>
  );
}
