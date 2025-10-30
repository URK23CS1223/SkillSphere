import express from "express";

const router = express.Router();

// Example quiz data
const quizzes = {
  DBMS: [
    { question: "What does DBMS stand for?", options: ["Database Management System", "Data Based Management Software", "Database Main System", "None"], answer: "Database Management System" },
    { question: "Which one is not a DBMS?", options: ["MySQL", "MongoDB", "Python", "PostgreSQL"], answer: "Python" }
  ],
  Python: [
    { question: "Who developed Python?", options: ["Guido van Rossum", "Dennis Ritchie", "James Gosling", "Bjarne Stroustrup"], answer: "Guido van Rossum" },
    { question: "Which symbol is used for comments in Python?", options: ["//", "#", "/* */", "<!-- -->"], answer: "#" }
  ]
};

// Route to get quiz by course name
router.get("/:courseName", (req, res) => {
  const { courseName } = req.params;
  const quiz = quizzes[courseName];
  if (quiz) {
    res.json({ success: true, quiz });
  } else {
    res.status(404).json({ success: false, message: "Quiz not found!" });
  }
});

export default router; // ✅ REQUIRED
