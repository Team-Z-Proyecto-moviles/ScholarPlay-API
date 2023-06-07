const express = require("express");
const router = express.Router();

const teacherController = require("../../controllers/teacher.controller");

const teacherValidators = require("../../validators/teacher.validators");
const runValidations = require("../../validators/index.middleware");

router.get("/", teacherController.findAll);

router.get("/:identifier", teacherValidators.findTeacherByIdValidator,
runValidations, 
teacherController.findOneById);

router.post("/", 
teacherValidators.createTeacherValidator,
runValidations,
teacherController.create);

module.exports = router;