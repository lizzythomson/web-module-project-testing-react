import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

const exampleShowData = {
  name: 'Example',
  summary: 'Really great summary',
  seasons: [
    { id: 123, name: 'Season 1', episodes: [] },
    { id: 223, name: 'Season 2', episodes: [] },
    { id: 323, name: 'Season 3', episodes: [] },
  ],
};

test('renders without errors', () => {
  render(<Show show={exampleShowData} selectedSeason={'none'} />);
});

test('renders Loading component when prop show is null', () => {
  render(<Show show={null} />);

  const loadingMessage = screen.getByText(/Fetching data.../i);

  expect(loadingMessage).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', () => {
  render(<Show show={exampleShowData} selectedSeason={'none'} />);

  const dropDown = screen.getByLabelText(/Select A Season/i);
  userEvent.click(dropDown);

  const seasons = screen.getAllByTestId(/season-option/i);
  expect(seasons).toHaveLength(3);
});

test('handleSelect is called when an season is selected', () => {
  const mockHandleSelect = jest.fn();

  render(
    <Show
      show={exampleShowData}
      selectedSeason={'none'}
      handleSelect={mockHandleSelect}
    />
  );
  const dropDown = screen.getByLabelText(/Select A Season/i);
  userEvent.click(dropDown);
  userEvent.selectOptions(screen.getByRole('combobox'), ['323']);

  expect(mockHandleSelect).toBeCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
  const { rerender } = render(
    <Show show={exampleShowData} selectedSeason={'none'} />
  );

  let episodeContainer = screen.queryByTestId(/episodes-container/);

  expect(episodeContainer).not.toBeInTheDocument();

  rerender(<Show show={exampleShowData} selectedSeason={2} />);

  episodeContainer = screen.queryByTestId(/episodes-container/);

  expect(episodeContainer).toBeInTheDocument();
});
