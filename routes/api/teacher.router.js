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
teacherValidators.registerTeacherValidator,
runValidations,
teacherController.register);

router.post("/signin", teacherController.login)

module.exports = router;