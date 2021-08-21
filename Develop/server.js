// Required dependencies
const express = require('express');
const path = require('path');
const api = require('./public/assets/js/index.js');

const app = express();
const PORT = process.env.PORT || 3001;

//Require routes file
require('./routes/apiRoutes')(app);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api', api);

// GET route for index page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);