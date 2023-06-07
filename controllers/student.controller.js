const Student = require("../models/Student.model");
const debug = require("debug")("app:student-controller");

const controller = {};

controller.create = async (req, res) => {
    try{
        
    
    const {name, password, email} = req.body;

    const student = new Student({
        name: name,
        password: password,
        email: email
    })

    const newStudent = await student.save();

    if(!newStudent){
        return res.staus(409).json({error: "Error developing student"});  
    }

    return res.status(201).json(newStudent);
    }catch (error){
        debug({ error  })
        return res.status(500).json({error: "Server Error"})
    }
    }

controller.findAll = async (req, res) => {
    try {
        const students = await Student.find();
        return res.status(200).json({students});
    } catch (error){
      debug({ error })
      return res.status(500).json({ error: "Error internal server"})
    }
}

controller.findOneById = async (req, res) => {
    try {
     const { identifier } = req.params;

     const student = await Student.findById(identifier);

     if(!student){
        return res.status(404)
        .json({error: "Student not found"})
     }
     
     return res.status(200).json(student);
    }catch(error){
        debug({error});
        return res.status(500).jason({error: "Error internal server"})
    }
}

module.exports = controller;