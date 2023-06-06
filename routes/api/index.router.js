const express = require("express");
const router = express.Router();

//Importing all the enrouters
const studentRouter = require("./student.router");

//Defining the routes
router.use("/student", studentRouter);

module.exports = router;
