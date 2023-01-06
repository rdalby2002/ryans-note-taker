const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid')

notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
  console.log(req.body);
  
  const {title, text} = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json('Note created.');
  } else {
    res.error('Error creating note');
  }
});

notes.delete('/:id', (req, res) => {
  const indexOfNote = readFromFile('./db/db.json').then((data) => data.indexOf(req.params.id));

  var result = json.splice(indexOfNote, 1);
  writeToFile('./db/db.json', result);
  res.json(true);
});

module.exports = notes;