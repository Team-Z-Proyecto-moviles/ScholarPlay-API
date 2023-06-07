const Classroom = require("../models/Classroom.model");
const debug = require("debug")("app:classroom-controller");

const controller = {};

controller.create = async (req, res) => {
  try {
    const { name, teacher, student } = req.body;

    const classroom = new Classroom({
      name: name,
      teacher: teacher,
      student: student
    });

    const newClassroom = await classroom.save();

    if (!newClassroom) {
      return res.status(409).json({ error: "Error creating classroom" });
    }

    return res.status(201).json(newClassroom);
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Server Error" });
  }
};

controller.findAll = async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    return res.status(200).json({classrooms});
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.findOneById = async (req, res) => {
  try {
    const { identifier } = req.params;

    const classroom = await Classroom.findById(identifier);

    if (!classroom) {
      return res.status(404).json({ error: "Classroom not found" });
    }

    return res.status(200).json(classroom);
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = controller;
