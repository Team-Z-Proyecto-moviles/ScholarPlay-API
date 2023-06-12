const Classroom = require("../models/Classroom.model");
const Teacher = require("../models/Teacher.model");
const Functions = require("../utils/functions.tools");
const debug = require("debug")("app:classroom-controller");



const controller = {};


controller.create = async (req, res) => {
  try {
    const { name, teacher, student, codeClassroom  } = req.body;

    const classroom = new Classroom({
      name: name,
      teacher: teacher,
      student: student,
      codeClassroom: Functions.CreateCodeClasroom()
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
/*
controller.findAll = async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    return res.status(200).json({classrooms});
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};*/



controller.findAll = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const classrooms = await Classroom.find()
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({ classrooms });
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

controller.findByTeacherId = async (req, res) => {
  try {
    const { teacherId } = req.params

    const classroom = await Classroom.find({ teacher: teacherId });

    if (!classroom) {
      return res.status(404).json({ error: "Classroom not found for the given teacher ID" });
    }

    return res.status(200).json(classroom);
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.deleteClassroomByIdentifier = async (req, res) => {
  try {
    const { identifier } = req.params;

    const classroom = await Classroom.findByIdAndDelete(identifier);

    if (!classroom) {
      return res.status(404).json({ error: "Classroom not found" });
    }

    return res.status(200).json({ message: "Classroom deleted successfully" });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Internal server error" });
  }
};

controller.findAllByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const classrooms = await Classroom.find({ student: studentId });

    if (classrooms.length === 0) {
      return res.status(404).json({ error: "Classroom not found for the given student ID" });
    }

    return res.status(200).json({ classrooms });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
/*
controller.findAllByStudentIdWithTeacherName = async (req, res) => {
  try {
    const { studentId } = req.params;

    const classrooms = await Classroom.find({ student: studentId }).populate("teacher", "name");

    if (classrooms.length === 0) {
      return res.status(404).json({ error: "Classroom not found for the given student ID" });
    }

    return res.status(200).json({ classrooms });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};*/
controller.findAllByStudentIdWithTeacherName = async (req, res) => {
  try {
    let { page = 1, limit = 10, offset = 0 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    offset = parseInt(offset);
    const { studentId } = req.params;

    const classrooms = await Classroom.find({ student: studentId })
      .skip((page - 1) * limit + offset)
      .limit(limit)
      .populate("teacher", "name");

    return res.status(200).json({ classrooms });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.updateByClassroomId = async (req, res) => {
  try {
    const { classroomId } = req.params;
    const { studentId } = req.body;

    const classroom = await Classroom.findById(classroomId);

    if (!classroom) {
      return res.status(404).json({ error: "Classroom not found" });
    }

    classroom.student.push(studentId);

    const updatedClassroom = await classroom.save();

    return res.status(200).json(updatedClassroom);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = controller;
