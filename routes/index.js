const express = require('express');

// Import notes routes from notes.js
const notesRouter = require('./notes');

const app = express();

// Establishes notes route
app.use('/notes', notesRouter);

module.exports = app;