const Homework = require("../models/Homework.model");
const Classroom = require("../models/Classroom.model");
const debug = require("debug")("app:homework-controller");

const controller = {};

controller.create = async (req, res) => {
    try{
        const {name, classroom, rubric} = req.body;

        const homework = new Homework({
            name: name,
            classroom: classroom,
            rubric: rubric
        });

        const newHomework = await homework.save();

        if(!newHomework) {
            return res.status(409).json({ error: "Error creating homework" });
        }

        return res.status(201).json(newHomework);
    }catch (error) {
        debug({ error });
        return res.status(500).json({ error: "Server Error" });
    }
};

controller.findByClassroomId = async (req, res) => {
    try {
        const { classroomId } = req.params;

        const homework = await Homework.find({classroom: classroomId});

        if(!homework){
            return res.status(404).json({ error: "Homework not found for the given classroom ID" });
        }

        return res.status(200).json(homework);
    } catch (error) {
        debug({ error });
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = controller;
