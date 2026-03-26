import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, TrendingUp, Award } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Subjects() {
  const { user } = useAuth();
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const studentRes = await api.get(`/students/email/${user.email}`);
      if (studentRes.data && studentRes.data._id) {
        const marksRes = await api.get(`/marks/student/${studentRes.data._id}`);
        setMarks(marksRes.data);
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

  const subjects = marks.map((m, i) => ({
    name: m.subject,
    marks: ((m.marks / m.maxMarks) * 100).toFixed(0),
    actualMarks: m.marks,
    maxMarks: m.maxMarks,
    color: ["from-blue-500 to-blue-600", "from-purple-500 to-purple-600", "from-green-500 to-green-600", 
            "from-orange-500 to-orange-600", "from-pink-500 to-pink-600", "from-indigo-500 to-indigo-600"][i % 6]
  }));

  const avgScore = subjects.length > 0 
    ? (subjects.reduce((sum, s) => sum + parseFloat(s.marks), 0) / subjects.length).toFixed(0)
    : 0;

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
            My Subjects
          </h1>
          <p className="text-slate-600 mt-1">Track your performance across all subjects</p>
        </div>
        {subjects.length > 0 && (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg">
            <p className="text-sm opacity-90">Average Score</p>
            <p className="text-2xl font-bold">{avgScore}%</p>
          </div>
        )}
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {subjects.map((sub, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className={`h-2 bg-gradient-to-r ${sub.color}`} />
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${sub.color} text-white`}>
                  <BookOpen size={24} />
                </div>
                {sub.marks >= 90 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Award className="text-yellow-500" size={24} />
                  </motion.div>
                )}
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-2">{sub.name}</h2>
              
              <div className="flex items-end justify-between mb-3">
                <div>
                  <p className="text-sm text-slate-600">Current Score</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {sub.marks}%
                  </p>
                </div>
                <TrendingUp className="text-green-500" size={20} />
              </div>

              <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${sub.marks}%` }}
                  transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                  className={`h-3 bg-gradient-to-r ${sub.color} rounded-full`}
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-sm">
                <span className={`px-3 py-1 rounded-full font-semibold ${
                  sub.marks >= 90 ? 'bg-green-100 text-green-700' :
                  sub.marks >= 80 ? 'bg-blue-100 text-blue-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {sub.marks >= 90 ? 'Excellent' : sub.marks >= 80 ? 'Good' : 'Average'}
                </span>
                <span className="text-slate-500">{sub.actualMarks}/{sub.maxMarks}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
