import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";

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

let words = [];
try {
  const wordsData = fs.readFileSync("./words.json", "utf-8");
  words = JSON.parse(wordsData);
} catch (error) {
  console.error("Failed to read words.json:", error);
  process.exit(1);
}

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
  const level = Number(req.query.level);

  let filteredWords = words;

  if (!isNaN(level)) {
    filteredWords = words.filter((w) => w.level === level);
  }

  const shuffled = shuffleArray(filteredWords);
  const selected = shuffled.slice(0, count);

  res.json(selected);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
