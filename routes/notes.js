const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid')

// Establishes that GET requests retrieve saved notes from db.json
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Establishes that POST requests save new notes to db/db.json
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

// Export pathing
module.exports = notes;

