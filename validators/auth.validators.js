const { body } = require("express-validator");

const authValidators = {};

authValidators.signinValidator = [
  body("identifier")
    .notEmpty().withMessage("Identifier cannot be empty"),
  body("password")
    .notEmpty().withMessage("Password cannot be empty")
];

module.exports = authValidators;
