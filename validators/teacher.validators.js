const { body, param } = require("express-validator");
const validators = {};
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})/

validators.createTeacherValidator = [
    body("name")
        .notEmpty().withMessage("Name can(not) be empty"),
    body("email")
        .notEmpty().withMessage("Email can(not) be empty")
        .isLength({ max: 280 }).withMessage("Email can(not) exceed 280 characters")
        .isEmail().withMessage("The format can(not) be like this"),
    body("password")
        .notEmpty().withMessage("password can(not) be empty")
        .matches(passwordRegexp).withMessage("The password must have between 8 and 32 characters, and at least 1 upper case, 1 lower case and 1 special symbol")
]

validators.findTeacherByIdValidator = [
    param("identifier")
        .notEmpty().withMessage("Identifier can(not) be empty")
        .isMongoId().withMessage("Identifier must be mongo")
]

module.exports = validators;