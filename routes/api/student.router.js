const express = require("express");
const router = express.Router();

const students = require('../../data/student.example.json')

router.get("/", (req, res,next)=>{
    return res.status(200).json({students});
});

router.get("/:identifier", (req, res) => {
    const id = req.params.identifier;

    const student = students.find(p => p.id == id);

    if(!student){
        return res.status(404)
            .json({ error: "Student not found" })
    }

    return res.status(200).json(student);
});

module.exports = router;