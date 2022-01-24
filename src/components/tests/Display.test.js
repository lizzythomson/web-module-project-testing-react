import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';

const exampleShowData = {
  name: 'Example',
  summary: 'Really great summary',
  seasons: [
    { id: 123, name: 'Season 1', episodes: [] },
    { id: 223, name: 'Season 2', episodes: [] },
    { id: 323, name: 'Season 3', episodes: [] },
  ],
};

test('renders without errors with no props', () => {
  render(<Display />);
});

test('renders Show component when the button is clicked ', () => {});

test('renders show season options matching your data when the button is clicked', () => {
  const { rerender } = render(<Display />);
});
