const Teacher = require("../models/Teacher.model");
const debug = require("debug")("app:teacher-controller");

const controller = {};

controller.create = async (req, res) => {
    try{

    const {name, password, email} = req.body;

    const teacher = new Teacher({   
        name: name,
        password: password,
        email: email
    })

    const newTeacher = await teacher.save();

    if(!newTeacher){
        return res.staus(409).json({error: "Error developing teacher"});  
    }

    return res.status(201).json(newTeacher);
    }catch (error){
        debug({ error  })
        return res.status(500).json({error: "Server Error"})
    }
}

controller.findAll = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        return res.status(200).json({teachers});
    } catch (error){
      debug({ error })
      return res.status(500).json({ error: "Error internal server"})
    }
}

controller.findOneById = async (req, res) => {
    try {
     const { identifier } = req.params;

     const teacher = await Teacher.findById(identifier);

     if(!teacher){
        return res.status(404)
        .json({error: "Teacher not found"})
     }
     
     return res.status(200).json(teacher);
    }catch(error){
        debug({error});
        return res.status(500).jason({error: "Error internal server"})
    }
}

module.exports = controller;