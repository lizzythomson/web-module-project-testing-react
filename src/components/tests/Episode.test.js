import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const testEpisode = {
  id: 1234,
  image:
    'https://images.unsplash.com/photo-1642986952108-9463d5404cea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
  name: 'Biking',
  season: 3,
  number: 28,
  summary: '11 and other characters bike together',
  runtime: 42,
};

const textEpisodeNullImage = {
  id: 1434,
  image: null,
  name: 'Biking',
  season: 3,
  number: 28,
  summary: '11 and other characters bike together',
  runtime: 42,
};

test('renders without error', () => {
  render(<Episode episode={testEpisode} />);
});

test('renders the summary test passed as prop', () => {
  render(<Episode episode={testEpisode} />);

  const textSummary = screen.queryByText(
    /11 and other characters bike together/i
  );
  const notTextSummary = screen.queryByText(/this episode is about smurfs/i);

  expect(textSummary).toBeInTheDocument();
  expect(textSummary).toBeTruthy();
  expect(textSummary).toBeVisible();
  expect(notTextSummary).not.toBeInTheDocument();
});

test('renders default image when image is not defined', () => {
  render(<Episode episode={textEpisodeNullImage} />);

  const altText = screen.queryByAltText(/stranger-things.png/);

  expect(altText).toBeInTheDocument();
});
