const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Load course data
const dataPath = path.join(__dirname, '/public/data.json');
let courseData = {};

try {
  courseData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
} catch (error) {
  console.error("Error reading data.json:", error);
  process.exit(1);
}

// API to get courses based on goal
app.get('/courses', (req, res) => {
  const goal = req.query.goal;

  if (courseData[goal]) {
    res.json(courseData[goal]);
  } else {
    res.status(404).json({ error: 'Goal not found' });
  }
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.resolve(__dirname, 'public') });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
