const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth.controller");
const authValidators = require("../../validators/auth.validators");
const runValidations = require("../../validators/index.middleware");

// Rutas de autenticación
router.post("/both/signin", authController.signIn);

module.exports = router;
