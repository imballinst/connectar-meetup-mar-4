const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { addRant, getRants } = require('./rants');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rant routes.
app.get('/api/rants', getRants);
app.post('/api/rants', addRant);

app.listen(port, () => {
  console.log(`Rantspace server listening at http://localhost:${port}`);
});
