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
studentValidators.registerStudentValidator,
runValidations,
studentController.register);

router.post("/signin", studentController.login);

router.get("/token/:tokens", studentValidators.finStudentByToken, runValidations, studentController.findOneByToken);


module.exports = router;