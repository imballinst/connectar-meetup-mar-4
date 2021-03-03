const formatRFC7231 = require('date-fns/formatRFC7231');
const parse = require('date-fns/parse');

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
    date: formatRFC7231(new Date(2021, 1, 20)),
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
  res.send(sort(rantsList));
}

// Add a rant.
function addRant(req, res) {
  const { title, date, content } = req.body;

  const rantDate = date ? new Date(date) : new Date();
  const newRant = {
    title,
    date: formatRFC7231(rantDate),
    content: content.length > 280 ? `${content.substring(0, 280)}...` : content
  };

  rantsList = rantsList.concat(newRant);

  res.send(newRant);
}

// Helper functions.
function sort(array) {
  return [...array].sort((a, b) => {
    return parseRFC7231(b.date).valueOf() - parseRFC7231(a.date).valueOf();
  });
}

function parseRFC7231(dateString) {
  return parse(dateString, "EEE, dd MMM yyyy HH:mm:ss 'GMT'", new Date());
}
