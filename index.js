import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let sectionOneData, sectionThreeData, sectionHeroData;
try {
  sectionOneData = JSON.parse(fs.readFileSync(path.join(__dirname, 'mockdata', 'sectionOneData.json')));
} catch (error) {
  console.error("Error loading sectionOneData.json:", error.message);
  sectionOneData = { error: "Error loading sectionOne data" };
}

try {
  sectionThreeData = JSON.parse(fs.readFileSync(path.join(__dirname, 'mockdata', 'sectionThreeData.json')));
} catch (error) {
  console.error("Error loading sectionThreeData.json:", error.message);
  sectionThreeData = { error: "Error loading sectionThree data" };
}

try {
  sectionHeroData = JSON.parse(fs.readFileSync(path.join(__dirname, 'mockdata', 'sectionHeroData.json')));
} catch (error) {
  console.error("Error loading sectionHeroData.json:", error.message);
  sectionHeroData = { error: "Error loading sectionHero data" };
}

app.get('/api/section-one', (req, res, next) => {
  try {
    res.json(sectionOneData);
  } catch (error) {
    next(error);
  }
});

app.get('/api/section-three', (req, res, next) => {
  try {
    res.json(sectionThreeData);
  } catch (error) {
    next(error);
  }
});

app.get('/api/section-hero', (req, res, next) => {
  try {
    res.json(sectionHeroData);
  } catch (error) {
    next(error);
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
