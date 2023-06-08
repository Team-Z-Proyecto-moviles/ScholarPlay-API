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


module.exports = router;