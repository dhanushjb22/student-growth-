import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import { BookOpen, Plus, Trash2 } from "lucide-react";

export default function AdminSubjects() {
  const [subjectName, setSubjectName] = useState("");
  const [semester, setSemester] = useState("Semester 1");
  const [maxMarks, setMaxMarks] = useState(100);
  const [subjects, setSubjects] = useState({});

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

  useEffect(() => {
    fetchSubjects();
  }, []);

  const addSubject = async () => {
    if (!subjectName) return alert("Enter subject name");

    try {
      await api.post("/subjects", {
        name: subjectName,
        semester,
        maxMarks
      });
      fetchSubjects();
      setSubjectName("");
      alert("Subject added successfully!");
    } catch (error) {
      console.error("Error adding subject:", error);
      alert("Error adding subject");
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
            <BookOpen className="text-blue-600" size={32} />
            Subject Management
          </h1>
          <p className="text-slate-600 mt-1">Add and organize subjects by semester</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-900">
          <Plus size={20} />
          Add New Subject
        </h2>

        <div className="grid md:grid-cols-4 gap-4">
          <input
            value={subjectName}
            onChange={e => setSubjectName(e.target.value)}
            placeholder="Subject Name"
            className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />

          <select
            value={semester}
            onChange={e => setSemester(e.target.value)}
            className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
              <option key={sem}>Semester {sem}</option>
            ))}
          </select>

          <input
            type="number"
            value={maxMarks}
            onChange={e => setMaxMarks(e.target.value)}
            placeholder="Max Marks"
            className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addSubject}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Add Subject
          </motion.button>
        </div>
      </motion.div>

      <div className="grid gap-6">
        {Object.keys(subjects).map((sem, idx) => (
          <motion.div
            key={sem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">{sem}</h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                {subjects[sem].length} Subjects
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {subjects[sem].map((sub, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-slate-50 to-blue-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between group hover:shadow-md transition-all"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{sub.name}</p>
                    <p className="text-sm text-slate-600">Max Marks: {sub.maxMarks}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
