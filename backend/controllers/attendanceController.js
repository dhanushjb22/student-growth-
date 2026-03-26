const Attendance = require("../models/Attendance");

// Add or Update Attendance
exports.addAttendance = async(req,res)=>{
  try{
    const { studentId, percentage } = req.body;

    const existing = await Attendance.findOne({studentId});

    if(existing){
      existing.percentage = percentage;
      await existing.save();
      return res.json({msg:"Attendance Updated"});
    }

    await Attendance.create({studentId,percentage});
    res.json({msg:"Attendance Added"});
  }catch(err){
    res.status(500).json(err);
  }
};

exports.getAttendance = async(req,res)=>{
  const data = await Attendance.findOne({studentId:req.params.id});
  res.json(data);
};
