const express = require("express");
const router = express.Router();

const studentController = require("../../controllers/student.controller");

const studentValidators = require("../../validators/student.validators");
const runValidations = require("../../validators/index.middleware");

router.get("/", studentController.findAll);

router.get("/:identifier", studentValidators.findStudenByIdValidator,
runValidations, 
studentController.findOneById);

router.post("/", 
studentValidators.createStudentValidator,
runValidations,
studentController.create);

module.exports = router;