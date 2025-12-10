import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders KKN FYSIO logo', () => {
  render(<App />);
  const logoElements = screen.getAllByText(/KKN FYSIO/i);
  expect(logoElements.length).toBeGreaterThan(0);
});
