const formatRFC7231 = require('date-fns/formatRFC7231');

// This is "in-memory" database for rants.
let rantsList = [
  {
    title: 'Tickatus Warlock',
    date: formatRFC7231(new Date(2021, 1, 28)),
    content:
      "Playing against Tickatus Warlock is so tense. I need to draw my key cards before it eats them. Whenever I face a Warlock, I pray that it can't tick on curve."
  },
  {
    title: 'Tickatus Warlock',
    date: formatRFC7231(new Date(2021, 1, 27)),
    content:
      "Playing against Tickatus Warlock is so tense. I need to draw my key cards before it eats them. Whenever I face a Warlock, I pray that it can't tick on curve."
  },
  {
    title: 'Tickatus Warlock',
    date: formatRFC7231(new Date(2021, 1, 26)),
    content:
      "Playing against Tickatus Warlock is so tense. I need to draw my key cards before it eats them. Whenever I face a Warlock, I pray that it can't tick on curve."
  },
  {
    title: 'Tickatus Warlock',
    date: formatRFC7231(new Date(2021, 1, 25)),
    content:
      "Playing against Tickatus Warlock is so tense. I need to draw my key cards before it eats them. Whenever I face a Warlock, I pray that it can't tick on curve."
  }
];

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
