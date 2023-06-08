const { body, param } = require("express-validator");
const validators = {};

validators.createHomeworkValidator = [
    body("name")
        .notEmpty().withMessage("Name can(not) be empty"),
    body("classroom")
        .notEmpty().withMessage("Classroom can(not) be empty"),
    body("rubric")
        .notEmpty().withMessage("Rubric can(not) be empty")
]

validators.findHomeworkByClassroomIdValidator = [
    param("classroomId")
        .notEmpty().withMessage("Classroom can(not) be empty")
]

module.exports = validators;