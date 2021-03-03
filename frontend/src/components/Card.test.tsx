import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import format from 'date-fns/format';
import subSeconds from 'date-fns/subSeconds';
import subWeeks from 'date-fns/subWeeks';

import { Card } from './Card';

it('renders normal Card', () => {
  const date = new Date(2021, 2, 4);
  const { getByText } = render(
    <Card
      title="Hello, world!"
      date={date.toISOString()}
      content="This is a test."
    />
  );

  expect(getByText('Hello, world!')).toBeInTheDocument();
  expect(getByText('This is a test.')).toBeInTheDocument();
  expect(getByText('March 04, 2021 00:00')).toBeInTheDocument();
});

it('renders a preview Card with short text', () => {
  const date = new Date(2021, 2, 4);
  const shortText = 'This is a test.';

  const { getByText } = render(
    <Card
      title="Hello, world!"
      date={date.toISOString()}
      content={shortText}
      preview
    />
  );

  expect(getByText('Hello, world!')).toBeInTheDocument();
  expect(getByText(shortText)).toBeInTheDocument();
  expect(getByText('March 04, 2021 00:00')).toBeInTheDocument();
});

it('renders a preview Card with short text', () => {
  const date = new Date(2021, 2, 4);
  const superLongText = Array.from(new Array(290), () => 'a').join('');

  const { getByText } = render(
    <Card
      title="Hello, world!"
      date={date.toISOString()}
      content={superLongText}
      preview
    />
  );

  expect(getByText('Hello, world!')).toBeInTheDocument();
  expect(getByText(`${superLongText.slice(0, 280)}...`)).toBeInTheDocument();
  expect(getByText('March 04, 2021 00:00')).toBeInTheDocument();
});

describe('renders a Card with relative date', () => {
  it('should render relative for less or equal than 1 week', () => {
    const date = subSeconds(new Date(), 5);

    const { getByText } = render(
      <Card
        title="Hello, world!"
        date={date.toISOString()}
        content="This is a test."
        relativeDate
        preview
      />
    );

    expect(getByText('Hello, world!')).toBeInTheDocument();
    expect(getByText('This is a test.')).toBeInTheDocument();
    expect(getByText('5 seconds ago')).toBeInTheDocument();
  });

  it('should render relative for more than 1 week', () => {
    const date = subWeeks(new Date(), 5);
    const formatted = format(date, 'MMMM dd, yyyy HH:mm');

    const { getByText } = render(
      <Card
        title="Hello, world!"
        date={date.toISOString()}
        content="This is a test."
        relativeDate
        preview
      />
    );

    expect(getByText('Hello, world!')).toBeInTheDocument();
    expect(getByText('This is a test.')).toBeInTheDocument();
    expect(getByText(formatted)).toBeInTheDocument();
  });
});
