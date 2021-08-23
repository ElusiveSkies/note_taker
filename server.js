// Required dependencies
const express = require("express");
const path = require("path");
const route = require("./routes/route.js");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Imports route js file
route(app);


// Imports savedNotes from db.json
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

// Allows savedNotes to be retrieved by unique ID numbers
app.get("/api/notes/:id", (req, res) => {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

  res.JSON(savedNotes[Number(req.params.id)]);
});

// Allows new note to be saved to db.json with unique id
app.post("/api/notes", (req, res) => {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let addedNote = req.body;
  let noteId = savedNotes.length.toString();
  addedNote.id = noteId;
  savedNotes.push(addedNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

// Allows notes to be removed by id
app.delete("/api/notes/:id", (req, res) => {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteId = req.params.id;
  let newNoteId = 0;
  savedNotes = savedNotes.filter(selectedNote => {
    return selectedNote.id != noteId;
  })

  for (selectedNote of savedNotes) {
    selectedNote.id = newNoteId.toString();
    newNoteId++;
  }

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.listen(PORT, () => console.log(`Now listening to port ${PORT}.`));
