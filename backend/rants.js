const formatRFC7231 = require('date-fns/formatRFC7231');

// This is "in-memory" database for rants.
let rantsList = [];

module.exports = {
  getRants,
  addRant
};

// Get rants.
function getRants(_req, res) {
  res.send(rantsList);
}

// Add a rant.
function addRant(req, res) {
  const { title, date, content } = req.body;

  const rantDate = date ? new Date(date) : new Date();
  const newRant = {
    title,
    date: formatRFC7231(rantDate),
    content
  };

  rantsList = rantsList.concat(newRant);

  res.send(newRant);
}
