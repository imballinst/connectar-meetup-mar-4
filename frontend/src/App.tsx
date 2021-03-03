import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
  useQueryClient
} from 'react-query';

import { Card, ICardProps } from './components/Card';
import './App.css';

function App() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<Omit<ICardProps, 'date' | 'className'>>({
    title: '',
    content: ''
  });

  const { isLoading, data = [] } = useQuery<ICardProps[]>(
    'rants',
    async () => {
      const response = await fetch('/api/rants');
      return response.json();
    },
    {
      refetchOnWindowFocus: true
    }
  );
  const mutation = useMutation<Response, Error, ICardProps, ICardProps[]>(
    (newRant) =>
      fetch('/api/rants', {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(newRant)
      }),
    {
      onSuccess: async (response) => {
        const json = await response.json();

        setForm({
          title: '',
          content: ''
        });
        queryClient.setQueryData<ICardProps[]>('rants', (oldData = []) => {
          return [json].concat(oldData);
        });
      }
    }
  );

  function handleChangeInput(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((oldForm) => ({
      ...oldForm,
      [name]: value
    }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutation.mutate({
      ...form,
      date: new Date().toISOString()
    });
  }

  return (
    <div className="min-h-screen bg-indigo-600 p-4">
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
        <form
          name="submit-rant"
          className="col-span-3 md:col-span-2 lg:col-span-3"
          onSubmit={onSubmit}
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
                value={form.title}
                onChange={handleChangeInput}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
              />
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="content"
              className="block text-sm font-bold text-indigo-100"
            >
              Rant content
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <textarea
                name="content"
                id="content"
                value={form.content}
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

        <section
          aria-label="Preview post"
          className="hidden md:block pl-4 pr-2 pt-6 py-14"
        >
          <Card
            title={form.title || 'Title placeholder'}
            content={form.content || 'Body placeholder'}
            date={new Date().toISOString()}
            className="p-2 h-full"
          />
        </section>
      </div>

      <ol
        aria-label="Rants"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {isLoading || mutation.isLoading
          ? 'Loading...'
          : data.map((content, index) => (
              <li key={index}>
                <Card className="p-2 h-full" {...content} relativeDate />
              </li>
            ))}
      </ol>
    </div>
  );
}

// Create a client.
const contextQueryClient = new QueryClient();

export default function Root() {
  return (
    <QueryClientProvider client={contextQueryClient}>
      <App />
    </QueryClientProvider>
  );
}
