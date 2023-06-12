const express = require("express");
const router = express.Router();

const classroomController = require("../../controllers/classroom.controller");

const classroomValidators = require("../../validators/classroom.validators");
const runValidations = require("../../validators/index.middleware");

const { authentication } = require("../../middlewares/auth.middlewares");

router.get("/", classroomController.findAll);

router.get("/:identifier", classroomValidators.findClassroomByIdValidator,
runValidations, 
classroomController.findOneById);

router.get("/found/:teacherId", classroomValidators.findClassroomByTeacherIdValidator,
runValidations, 
classroomController.findByTeacherId);

router.post("/",
classroomValidators.createClassroomValidator,
runValidations,
classroomController.create);

router.delete("/delete/:identifier", classroomValidators.deleteClassroomByIdentifierValidator, runValidations, classroomController.deleteClassroomByIdentifier);

router.get("/students/classrooms/:studentId", classroomValidators.findClassroomsByStudentIdValidator, runValidations, classroomController.findAllByStudentId);

router.get("/students/classrooms/plusname/teacher/:studentId", classroomValidators.findClassroomsByStudentIdValidator, runValidations, classroomController.findAllByStudentIdWithTeacherName);

module.exports = router;