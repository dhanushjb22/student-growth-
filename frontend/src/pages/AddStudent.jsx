import { useState } from "react";
import api from "../api/axios";

export default function AddStudent(){
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");

  const addStudent = async()=>{
    await api.post("/students/add",{name,email});
    alert("Student Added");
  };

  return(
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">➕ Add Student</h1>

      <input className="border p-2 mr-2"
        placeholder="Name"
        onChange={e=>setName(e.target.value)}
      />
      <input className="border p-2 mr-2"
        placeholder="Email"
        onChange={e=>setEmail(e.target.value)}
      />

      <button onClick={addStudent}
        className="bg-blue-600 text-white px-4 py-2">
        Add
      </button>
    </div>
  );
}
