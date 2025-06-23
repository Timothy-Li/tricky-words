import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : [];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        // origin is allowed
        callback(null, true);
      } else {
        // origin not allowed
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

const words = [
  { word: "is", correct: null },
  { word: "I", correct: null },
  { word: "the", correct: null },
  { word: "put", correct: null },
  { word: "pull", correct: null },
  { word: "full", correct: null },
  { word: "as", correct: null },
  { word: "and", correct: null },
  { word: "has", correct: null },
  { word: "his", correct: null },
  { word: "her", correct: null },
  { word: "go", correct: null },
  { word: "no", correct: null },
  { word: "to", correct: null },
  { word: "into", correct: null },
  { word: "she", correct: null },
  { word: "push", correct: null },
  { word: "he", correct: null },
  { word: "of", correct: null },
  { word: "we", correct: null },
  { word: "me", correct: null },
  { word: "be", correct: null },
  { word: "was", correct: null },
  { word: "you", correct: null },
  { word: "they", correct: null },
  { word: "my", correct: null },
  { word: "by", correct: null },
  { word: "all", correct: null },
  { word: "are", correct: null },
  { word: "sure", correct: null },
  { word: "pure", correct: null },
];

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

app.get("/", (req, res) => {
  res.send("Tricky Words API is running");
});

app.get("/words", (req, res) => {
  const count = Number(req.query.count) || 10;

  const shuffled = shuffleArray(words);
  const selected = shuffled.slice(0, count);

  res.json(selected);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
