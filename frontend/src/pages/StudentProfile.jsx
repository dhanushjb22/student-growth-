import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, BookOpen, Calendar, Award, Edit2, Save, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function StudentProfile() {
  const { user } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchProfile = async () => {
    if (!user?.email) return;
    try {
      const res = await api.get(`/students/email/${user.email}`);
      setStudentData(res.data);
      setFormData(res.data);
      if (res.data.profilePicture) {
        setPreviewUrl(res.data.profilePicture);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const updateData = { ...formData };
      if (previewUrl && previewUrl.startsWith('data:')) {
        updateData.profilePicture = previewUrl;
      }
      await api.put(`/students/${studentData._id}`, updateData);
      setStudentData(updateData);
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!studentData) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          My Profile
        </h1>
        {!editing ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Edit2 size={18} /> Edit Profile
          </motion.button>
        ) : (
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Save size={18} /> Save
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setEditing(false);
                setFormData(studentData);
              }}
              className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              <X size={18} /> Cancel
            </motion.button>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8"
      >
        <div className="flex items-center gap-6 mb-8">
          {/* Profile Picture */}
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-xl opacity-50"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              {previewUrl ? (
                <motion.img
                  src={previewUrl}
                  alt="Profile"
                  className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl"
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
                  className="relative w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-2xl border-4 border-white"
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
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            {editing && (
              <motion.label
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition-colors"
              >
                <Edit2 size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </motion.label>
            )}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">{studentData.name}</h2>
            <p className="text-slate-600">{studentData.rollNumber}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <ProfileField
            icon={<User />}
            label="Full Name"
            value={formData.name}
            editing={editing}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <ProfileField
            icon={<Mail />}
            label="Email"
            value={formData.email}
            editing={false}
          />
          <ProfileField
            icon={<BookOpen />}
            label="Department"
            value={formData.department}
            editing={editing}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          />
          <ProfileField
            icon={<Calendar />}
            label="Semester"
            value={formData.semester}
            editing={editing}
            onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
          />
          <ProfileField
            icon={<Award />}
            label="Roll Number"
            value={formData.rollNumber}
            editing={editing}
            onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
          />
        </div>
      </motion.div>
    </div>
  );
}

const ProfileField = ({ icon, label, value, editing, onChange }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-slate-50 p-4 rounded-xl border border-slate-200"
  >
    <div className="flex items-center gap-2 text-slate-600 mb-2">
      {icon}
      <span className="text-sm font-semibold">{label}</span>
    </div>
    {editing && onChange ? (
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    ) : (
      <p className="text-lg font-semibold text-slate-900">{value}</p>
    )}
  </motion.div>
);
