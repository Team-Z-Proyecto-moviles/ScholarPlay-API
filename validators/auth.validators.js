const { body } = require("express-validator");

const authValidators = {};

authValidators.signinValidator = [
  body("identifier")
    .notEmpty().withMessage("Identifier can(not) be empty"),
  body("password")
    .notEmpty().withMessage("Password can(not) be empty")
];

module.exports = authValidators;

