const Student = require("../models/Student.model");
const debug = require("debug")("app:student-controller");

const controller = {};

controller.register = async (req, res) => {
    try{
        
    const {name, password, email} = req.body;

    const student = await Student.findOne({ $or: [{name: name}, {email: email} ]});

    if(student) {
        return res.status(409).json({ error: "The student already exits" })
    }

    const newStudent = new Student({
        name: name,
        password: password,
        email: email
    })

    await newStudent.save();

    return res.status(201).json({message: "User develop succesfull "});
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

controller.login = async (req, res) => {
    try{
        const { identifier, password } = req.body

        const student = await Student.findOne({ $or: [ {name: identifier}, { email: identifier } ] });

        if (!student) {
            return res.status(404).json({ error: "The student does(not) exits" });
        }

        if (!student.comparePassword(password)) {
            return res.status(401).json({ error: "password incorrect" });
        }

        return res.status(200).json({ message: "The student has succesfull login"})
    }catch(error){
    debug(error);
    return res.status(500).json({ error: "Sever error" })
    }
}

module.exports = controller;