import React, { ChangeEvent, useState } from 'react';
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
  const [form, setForm] = useState<Omit<ICardProps, 'date' | 'className'>>({
    title: '',
    body: ''
  });

  function handleChangeInput(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((oldForm) => ({
      ...oldForm,
      [name]: value
    }));
  }

  return (
    <div className="min-h-screen bg-indigo-600 p-4">
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
        <form
          name="submit-rant"
          className="col-span-3 md:col-span-2 lg:col-span-3"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-bold text-indigo-100"
            >
              Rant title
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="title"
                id="title"
                onChange={handleChangeInput}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
              />
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="body"
              className="block text-sm font-bold text-indigo-100"
            >
              Rant content
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <textarea
                name="body"
                id="body"
                onChange={handleChangeInput}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
              />
            </div>
          </div>
          <div className="mt-4 text-right">
            <button
              type="submit"
              className="w-24 inline-flex justify-center font-bold py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-indigo-500 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Post
            </button>
          </div>
        </form>

        <div className="hidden md:block pl-4 pr-2 pt-6 py-14">
          <Card
            title={form.title || 'Title placeholder'}
            body={form.body || 'Body placeholder'}
            date="February 24, 2021"
            className="p-2 h-full"
          />
        </div>
      </div>

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
