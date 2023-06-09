const Student = require("../models/Student.model");
const Teacher = require("../models/Teacher.model");
const debug = require("debug")("app:auth-controller");
const { createTokenstudent, createTokensteacher, verifyToken } = require("../utils/jwt.tools");

const authController = {};

authController.signIn = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Buscar tanto en estudiantes como en profesores por el identificador proporcionado
    const student = await Student.findOne({ $or: [{ name: identifier }, { email: identifier }] });
    const teacher = await Teacher.findOne({ $or: [{ name: identifier }, { email: identifier }] });

    // Verificar si el usuario existe y si la contraseña coincide
    let user = null;
    let isStudent = false;

    if (student) {
      user = student;
      isStudent = true;
    } else if (teacher) {
      user = teacher;
    }

    if (!user) {
      return res.status(404).json({ error: "The user does not exist" });
    }

    if (!user.comparePassword(password)) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Aqui se genera el token
    let token = "";
    if (isStudent) {
      token = createTokenstudent(user._id);
    } else {
      token = createTokensteacher(user._id);
    }

    // Y aqui se le asigna
    user.tokens = [token, ...user.tokens.filter((_token) => verifyToken(_token)).splice(0, 4)];
    await user.save();

    return res.status(201).json({message: "User develop succesfull "});
  } catch (error) {
    debug(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = authController;
