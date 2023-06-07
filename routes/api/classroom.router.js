const express = require("express");
const router = express.Router();

const classroomController = require("../../controllers/classroom.controller");

const classroomValidators = require("../../validators/classroom.validators");
const runValidations = require("../../validators/index.middleware");

router.get("/", classroomController.findAll);

router.get("/:identifier", classroomValidators.findClassroomByIdValidator,
runValidations, 
classroomController.findOneById);

router.post("/", 
classroomValidators.createClassroomValidator,
runValidations,
classroomController.create);

module.exports = router;