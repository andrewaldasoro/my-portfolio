import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Main from './Main';

describe('<Main />', () => {
  test('it should renders Main and root path', () => {
    render(<Main />);
    screen.getByText(/aboutme/i);
    screen.getByText(/career/i);
  });
});
