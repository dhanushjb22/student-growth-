import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../api/axios";
import { FileText, Save, User, BookOpen } from "lucide-react";

export default function AdminMarksentry() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState({});
  const [student, setStudent] = useState("");
  const [semester, setSemester] = useState("");
  const [marks, setMarks] = useState({});

  useEffect(() => {
    fetchStudents();
    fetchSubjects();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await api.get("/subjects");
      const grouped = res.data.reduce((acc, sub) => {
        if (!acc[sub.semester]) acc[sub.semester] = [];
        acc[sub.semester].push(sub);
        return acc;
      }, {});
      setSubjects(grouped);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleMarkChange = (subject, value) => {
    setMarks(prev => ({ ...prev, [subject]: value }));
  };

  const saveMarks = async () => {
    if (!student || !semester) return alert("Select student and semester");

    const selectedStudent = students.find(s => s._id === student);
    if (!selectedStudent) return;

    const marksArray = Object.keys(marks).map(subject => ({
      subject,
      marks: parseInt(marks[subject]) || 0,
      maxMarks: 100
    }));

    try {
      await api.post("/marks/bulk", {
        studentId: selectedStudent._id,
        semester,
        marks: marksArray
      });
      alert("Marks saved successfully!");
      setMarks({});
    } catch (error) {
      console.error("Error saving marks:", error);
      alert("Error saving marks");
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
            <FileText className="text-blue-600" size={32} />
            Marks Entry
          </h1>
          <p className="text-slate-600 mt-1">Enter and manage student marks</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
      >
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
              <User size={16} />
              Select Student
            </label>
            <select
              value={student}
              onChange={e => setStudent(e.target.value)}
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
              <BookOpen size={16} />
              Select Semester
            </label>
            <select
              value={semester}
              onChange={e => setSemester(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">Choose Semester</option>
              {Object.keys(subjects).map((sem) => (
                <option key={sem}>{sem}</option>
              ))}
            </select>
          </div>
        </div>

        {student && semester && subjects[semester] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200"
          >
            <h3 className="font-bold text-lg mb-4 text-blue-900">
              Enter Marks for {semester}
            </h3>

            <div className="space-y-4">
              {subjects[semester].map((sub, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between bg-white p-4 rounded-xl"
                >
                  <span className="font-medium text-slate-900">{sub.name}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Marks"
                      value={marks[sub.name] || ""}
                      onChange={e => handleMarkChange(sub.name, e.target.value)}
                      className="w-24 px-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-center font-semibold"
                      min="0"
                      max={sub.maxMarks}
                    />
                    <span className="text-slate-600">/ {sub.maxMarks}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={saveMarks}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Save Marks
            </motion.button>
          </motion.div>
        )}

        {!student && !semester && (
          <div className="text-center py-12 text-slate-400">
            <FileText size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">Select student and semester to enter marks</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
