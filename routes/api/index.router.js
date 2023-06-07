const express = require("express");
const router = express.Router();

//Importing all the enrouters
const studentRouter = require("./student.router");
const teacherRouter = require("./teacher.router");
const classroomRouter = require("./classroom.router")

//Defining the routes
router.use("/student", studentRouter);
router.use("/teacher", teacherRouter);
router.use("/classroom", classroomRouter);

module.exports = router;



