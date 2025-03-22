// Create web server
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;

// Set up the body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the static file server
app.use(express.static(path.join(__dirname, 'public')));

// Set up the comments API
app.get('/api/comments', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.post('/api/comments', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    const comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), (err) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(comments));
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});