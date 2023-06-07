const Teacher = require("../models/Teacher.model");
const debug = require("debug")("app:teacher-controller");

const controller = {};

controller.register = async (req, res) => {
    try{

    const {name, password, email} = req.body;

    const teacher = await Teacher.findOne({ $or: [{name: name}, {email: email} ]});

    if(teacher) {
        return res.status(409).json({ error: "The teacher already exits" })
    }

    const newTeacher = new Teacher({
        name: name,
        password: password,
        email: email
    })

    await newTeacher.save();

    return res.status(201).json({message: "Teacher develop succesfull"});
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

controller.login = async (req, res) => {
    try{
        const { identifier, password } = req.body

        const teacher = await Teacher.findOne({ $or: [ {name: identifier}, { email: identifier } ] });

        if (!teacher) {
            return res.status(404).json({ error: "The teacher does(not) exits" });
        }

        if (!teacher.comparePassword(password)) {
            return res.status(401).json({ error: "password incorrect" });
        }

        return res.status(200).json({ message: "The teacher has succesfull login"})
    }catch(error){
    debug(error);
    return res.status(500).json({ error: "Sever error" })
    }
}

module.exports = controller;