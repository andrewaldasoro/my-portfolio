import React from 'react';
import { render } from '@testing-library/react';
import App from './Main';

test('renders About Me link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Featured Projects/i);
  expect(linkElement).toBeInTheDocument();
});
