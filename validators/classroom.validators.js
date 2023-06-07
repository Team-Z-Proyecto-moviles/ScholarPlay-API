const { body, param } = require("express-validator");
const validators = {};

validators.createClassroomValidator = [
    body("name")
        .notEmpty().withMessage("Name can(not) be empty"),
    body("teacher")
    .notEmpty().withMessage("Teacher can(not) be empty"),
    body("student")
    .notEmpty().withMessage("Student can(not) be empty")
]

validators.findClassroomByIdValidator = [
    param("identifier")
        .notEmpty().withMessage("Identifier can(not) be empty")
        .isMongoId().withMessage("Identifier must be mongo")
]

validators.findClassroomByTeacherIdValidator = [
    param("identifier")
        .notEmpty().withMessage("Identifier can(not) be empty")
]

module.exports = validators;
