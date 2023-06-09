const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth.controller");

// Rutas de autenticación
router.post("/both/signin", authController.signIn);

router.get("/find/status/:token", authController.findOneByToken);
module.exports = router;
