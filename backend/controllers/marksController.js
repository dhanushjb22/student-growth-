const Marks = require("../models/Marks");

// Add or Update Marks
exports.addMarks = async (req,res)=>{
  try{
    const { studentId, subject, marks } = req.body;

    const existing = await Marks.findOne({studentId,subject});

    if(existing){
      existing.marks = marks;
      await existing.save();
      return res.json({msg:"Marks Updated"});
    }

    await Marks.create({studentId,subject,marks});
    res.json({msg:"Marks Added"});
  }catch(err){
    res.status(500).json(err);
  }
};

// Get student marks
exports.getStudentMarks = async(req,res)=>{
  const data = await Marks.find({studentId:req.params.id});
  res.json(data);
};
