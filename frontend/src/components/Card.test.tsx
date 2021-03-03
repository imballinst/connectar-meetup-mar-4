import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
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
