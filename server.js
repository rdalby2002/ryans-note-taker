const express = require("express");
const path = require("path");
const clog = require("./middleware/clog");
const api = require('./routes/index');
const database = require('./db/db.json');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

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
