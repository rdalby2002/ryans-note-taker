// Require necessary packages
const express = require("express");
const path = require("path");
const fs = require('fs');

// Require middleware and note pathing from clog.js and index.js respectively
const clog = require("./middleware/clog");
const api = require('./routes/index');

// Require note file to be used in DELETE Router
const database = require('./db/db.json');


const app = express();
// Sets up the site's port, either as process.env.PORT for Heroku and as port 3001 for local use
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(clog);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Establishes GET and POST routes for /api/notes as set up in notes.json and index.json
app.use('/api', api);

// Set static site to public foler
app.use(express.static('public'));

// Establishes index.js as the site's landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Sets path for the notes.html page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Ensures that wildcard routes return users to the landing page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Bind and listen the connections on the specified host and port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

// Delete route that loops through all notes looking for the note with the matching ID, and splices it from the collection
app.delete("/api/notes/:id", function (req, res) {
  let jsonFilePath = path.join(__dirname, "/db/db.json");
  for (let i = 0; i < database.length; i++) {

      if (database[i].id == req.params.id) {
          database.splice(i, 1);
          break;
      }
  }
  fs.writeFileSync(jsonFilePath, JSON.stringify(database), function (err) {

      if (err) {
          return console.log(err);
      } else {
          console.log("Your note was deleted!");
      }
  });
  res.json(database);
});
