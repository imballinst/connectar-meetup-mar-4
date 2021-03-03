import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Card } from './Card';

it('renders normal Card', () => {
  const date = 'Wed, 04 Mar 2021 00:00:00 GMT';
  const { getByText } = render(
    <Card title="Hello, world!" date={date} content="This is a test." />
  );

  expect(getByText('Hello, world!')).toBeInTheDocument();
  expect(getByText('This is a test.')).toBeInTheDocument();
  expect(getByText(date)).toBeInTheDocument();
});

describe('preview', () => {
  it('renders a preview Card with short text', () => {
    const date = 'Wed, 04 Mar 2021 00:00:00 GMT';
    const shortText = 'This is a test.';

    const { getByText } = render(
      <Card title="Hello, world!" date={date} content={shortText} preview />
    );

    expect(getByText('Hello, world!')).toBeInTheDocument();
    expect(getByText(shortText)).toBeInTheDocument();
    expect(getByText(date)).toBeInTheDocument();
  });

  it('renders a preview Card with short text', () => {
    const date = 'Wed, 04 Mar 2021 00:00:00 GMT';
    const superLongText = Array.from(new Array(290), () => 'a').join('');

    const { getByText } = render(
      <Card title="Hello, world!" date={date} content={superLongText} preview />
    );

    expect(getByText('Hello, world!')).toBeInTheDocument();
    expect(getByText(`${superLongText.slice(0, 280)}...`)).toBeInTheDocument();
    expect(getByText(date)).toBeInTheDocument();
  });
});
