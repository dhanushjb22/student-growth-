import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Users, Plus, Search, Trash2, Edit, CheckCircle, XCircle, Bell } from "lucide-react";

export default function AdminStudents() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    rollNumber: "",
    department: "",
    semester: "Semester 1"
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async () => {
    if (!form.name || !form.email) return alert("Enter student name and email");

    try {
      if (editingId) {
        await api.put(`/students/${editingId}`, form);
        alert("Student updated successfully!");
        setEditingId(null);
      } else {
        await api.post("/students", form);
        alert("Student added successfully!");
      }
      fetchStudents();
      setForm({ name: "", email: "", rollNumber: "", department: "", semester: "Semester 1" });
    } catch (error) {
      console.error("Error saving student:", error);
      alert("Error saving student");
    }
  };

  const editStudent = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      rollNumber: student.rollNumber,
      department: student.department,
      semester: student.semester
    });
    setEditingId(student._id);
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    
    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
      alert("Student deleted!");
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const filteredStudents = students.filter(s =>
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.rollNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const update = () => {
      const stored = JSON.parse(localStorage.getItem("adminAccessRequests") || "[]");
      setRequests(stored);
    };
    update();
    const interval = setInterval(update, 2000);
    return () => clearInterval(interval);
  }, []);

  const updateRequest = (index, status) => {
    const all = JSON.parse(localStorage.getItem("adminAccessRequests") || "[]");
    all[index].status = status;
    all[index].resolvedAt = new Date().toLocaleString();
    localStorage.setItem("adminAccessRequests", JSON.stringify(all));
    setRequests([...all]);
  };

  const pendingRequests = requests.filter(r => r.status === "pending");

  return (
    <div className="space-y-6">

      {/* Admin Access Requests Notification */}
      <AnimatePresence>
        {pendingRequests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Bell size={20} className="text-amber-400" />
              <h2 className="text-lg font-bold text-amber-400">Pending Admin Access Requests ({pendingRequests.length})</h2>
            </div>
            <div className="space-y-3">
              {requests.map((req, i) =>
                req.status === "pending" ? (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-xl p-4"
                  >
                    <div>
                      <p className="text-white font-semibold">{req.email}</p>
                      <p className="text-xs text-slate-400">Requested at: {req.requestedAt}</p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateRequest(i, "approved")}
                        className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm font-semibold"
                      >
                        <CheckCircle size={15} /> Approve
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateRequest(i, "rejected")}
                        className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl text-sm font-semibold"
                      >
                        <XCircle size={15} /> Reject
                      </motion.button>
                    </div>
                  </motion.div>
                ) : null
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Users className="text-cyan-400" size={32} />
            Student Management
          </h1>
          <p className="text-slate-300 mt-1">Add and manage student records</p>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg">
          <p className="text-sm opacity-90">Total Students</p>
          <p className="text-2xl font-bold">{students.length}</p>
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
          {editingId ? "Edit Student" : "Add New Student"}
        </h2>

        <div className="grid md:grid-cols-6 gap-4">
          <input
            placeholder="Student Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />

          <input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />

          <input
            placeholder="Roll Number"
            value={form.rollNumber}
            onChange={e => setForm({ ...form, rollNumber: e.target.value })}
            className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />

          <input
            placeholder="Department"
            value={form.department}
            onChange={e => setForm({ ...form, department: e.target.value })}
            className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />

          <select
            value={form.semester}
            onChange={e => setForm({ ...form, semester: e.target.value })}
            className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
              <option key={sem}>Semester {sem}</option>
            ))}
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addStudent}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {editingId ? <><Edit size={20} /> Update</> : <><Plus size={20} /> Add</>}
          </motion.button>
        </div>

        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", email: "", rollNumber: "", department: "", semester: "Semester 1" });
            }}
            className="mt-4 text-sm text-slate-600 hover:text-slate-900"
          >
            Cancel Edit
          </button>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Student List</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              placeholder="Search students..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Roll Number</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Department</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Semester</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium">{s.name}</td>
                  <td className="py-3 px-4 text-slate-600">{s.email}</td>
                  <td className="py-3 px-4">{s.rollNumber}</td>
                  <td className="py-3 px-4">{s.department}</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {s.semester}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => editStudent(s)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => deleteStudent(s._id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
