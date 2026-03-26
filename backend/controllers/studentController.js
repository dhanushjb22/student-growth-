const Student = require("../models/Student");

exports.addStudent = async (req,res)=>{
  try{
    const student = await Student.create(req.body);
    res.json(student);
  }catch(err){
    res.status(500).json(err);
  }
};

exports.getStudents = async (req,res)=>{
  const students = await Student.find();
  res.json(students);
};

exports.updateMarks = async (req,res)=>{
  const { id } = req.params;
  const { marks } = req.body;

  const student = await Student.findByIdAndUpdate(
    id,
    { marks },
    { new:true }
  );
  res.json(student);
};

exports.updateAttendance = async (req,res)=>{
  const { id } = req.params;
  const { attendance } = req.body;

  const student = await Student.findByIdAndUpdate(
    id,
    { attendance },
    { new:true }
  );
  res.json(student);
};
