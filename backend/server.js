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

app.get("/api/wordoftheday", async (req, res) => {
  try {
    const apiKey = process.env.WORDNIK_API_KEY;
    const response = await fetch(
      `https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=${apiKey}`
    );

    if (!response.ok) {
      console.error(
        `Wordnik API error: ${response.status} ${response.statusText}`
      );
      return res
        .status(response.status)
        .json({ error: "Failed to fetch Word of the Day" });
    }

    const rawData = await response.json();

    const data = {
      word: rawData.word,
      partOfSpeech: rawData.definitions?.[0]?.partOfSpeech || null,
      definition: rawData.definitions?.[0]?.text || "No definition available.",
    };

    res.json(data);
  } catch (err) {
    console.error("Error fetching Wordnik Word of the Day:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
