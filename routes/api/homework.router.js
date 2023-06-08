const express = require("express");
const router = express.Router();

const homeworkController = require("../../controllers/homework.controller");

const homeworkValidators = require("../../validators/homework.validators");
const runValidations = require("../../validators/index.middleware");

router.get("/found/:classroomId",
  homeworkValidators.findHomeworkByClassroomIdValidator,
  runValidations,
  homeworkController.findByClassroomId
);

router.post("/",
  homeworkValidators.createHomeworkValidator,
  runValidations,
  homeworkController.create
);

module.exports = router;
