const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Load data.json
const dataPath = path.join(__dirname, 'data.json');
let data = {};

try {
  data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
} catch (error) {
  console.error('Error reading data.json:', error);
  process.exit(1); // Exit if data file is missing
}

// API endpoint
app.get('/courses', (req, res) => {
  const goal = req.query.goal;
  if (goal && data[goal]) {
    res.json(data[goal]);
  } else {
    res.status(404).json({ error: 'Goal not found' });
  }
});

// Handle all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});