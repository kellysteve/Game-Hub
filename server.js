const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route for serving each HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/dice-roll', (req, res) => {
  res.sendFile(path.join(__dirname, 'dice-roll.html'));
});

app.get('/number-guess', (req, res) => {
  res.sendFile(path.join(__dirname, 'number-guess.html'));
});

app.get('/slot-machine', (req, res) => {
  res.sendFile(path.join(__dirname, 'slot-machine.html'));
});

app.get('/leaderboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'leaderboard.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});