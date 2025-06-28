// routes/analyze.js

const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const path = require("path");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Predefined known skills
const skillSet = [
  "javascript", "typescript", "react", "nodejs", "html", "css",
  "python", "java", "git", "express", "mongodb", "sql",
  "agile", "scrum", "docker", "aws", "api", "testing", "problem solving"
];

// ✅ Helper: Extract words
function extractWords(text) {
  return text
    .toLowerCase()
    .match(/[a-zA-Z]+/g)
    .filter(word => word.length > 2);
}

// ✅ Smart Match Analysis
function analyzeText(resumeText, jobText) {
  const resumeWords = new Set(extractWords(resumeText));
  const jobWords = new Set(extractWords(jobText));

  const relevantSkills = skillSet.filter(skill => jobWords.has(skill));
  const matchedSkills = relevantSkills.filter(skill => resumeWords.has(skill));
  const missingSkills = relevantSkills.filter(skill => !resumeWords.has(skill));

  const matchScore = relevantSkills.length > 0
    ? Math.round((matchedSkills.length / relevantSkills.length) * 100)
    : 0;

  let suggestions = "Your resume and job description do not share many required skills.";
  if (matchScore >= 90) {
    suggestions = "✅ Excellent match! Your resume is highly aligned with the job description.";
  } else if (matchScore >= 70) {
    suggestions = "👍 Good match! You might want to fine-tune a few areas.";
  } else if (matchScore >= 50) {
    suggestions = "⚠️ Moderate match. Consider improving or tailoring your resume.";
  } else {
    suggestions = "❗ Low match. Consider aligning your resume better with the job description.";
  }

  return {
    matchScore,
    matchedSkills,
    missingSkills,
    suggestions
  };
}

// ✅ POST /analyze
router.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    const jobDescription = req.body.jobDescription || "";
    let resumeText = req.body.resumeText || "";

    if (!resumeText && req.file) {
      const fileBuffer = req.file.buffer;
      const ext = path.extname(req.file.originalname).toLowerCase();

      if (ext === ".pdf") {
        const data = await pdfParse(fileBuffer);
        resumeText = data.text;
      } else if (ext === ".txt") {
        resumeText = fileBuffer.toString("utf-8");
      } else {
        return res.status(400).json({ msg: "Only .pdf or .txt files are supported." });
      }
    }

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ msg: "Resume text and job description are required." });
    }

    const analysis = analyzeText(resumeText, jobDescription);
    res.json(analysis);
  } catch (err) {
    console.error("Analysis Error:", err);
    res.status(500).json({ msg: "Internal server error. Try again later." });
  }
});

module.exports = router;