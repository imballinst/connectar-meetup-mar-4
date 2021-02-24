import React, { useState } from 'react';
import { Card, ICardProps } from './components/Card';
import './App.css';

const CARD_CONTENTS: ICardProps[] = [
  {
    title: 'Tickatus Warlock',
    date: 'February 24, 2021',
    body:
      "Playing against Tickatus Warlock is so tense. I need to draw my key cards before it eats them. Whenever I face a Warlock, I pray that it can't tick on curve."
  },
  {
    title: 'Tickatus Warlock',
    date: 'February 24, 2021',
    body:
      "Playing against Tickatus Warlock is so tense. I need to draw my key cards before it eats them. Whenever I face a Warlock, I pray that it can't tick on curve."
  },
  {
    title: 'Tickatus Warlock',
    date: 'February 24, 2021',
    body:
      "Playing against Tickatus Warlock is so tense. I need to draw my key cards before it eats them. Whenever I face a Warlock, I pray that it can't tick on curve."
  },
  {
    title: 'Tickatus Warlock',
    date: 'February 24, 2021',
    body:
      "Playing against Tickatus Warlock is so tense. I need to draw my key cards before it eats them. Whenever I face a Warlock, I pray that it can't tick on curve."
  }
];

function App() {
  const [contents, setContents] = useState(CARD_CONTENTS);

  return (
    <div className="min-h-screen bg-indigo-600 p-4">
      <form name="submit-rant">
        <label
          htmlFor="rant-content"
          className="block text-sm font-medium text-gray-700"
        >
          Website
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            name="rant-content"
            id="rant-content"
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
            placeholder="Write your rant..."
          />
        </div>
      </form>

      <section
        aria-label="Cards"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {CARD_CONTENTS.map((content) => (
          <Card className="p-2" {...content} />
        ))}
      </section>
    </div>
  );
}

export default App;
