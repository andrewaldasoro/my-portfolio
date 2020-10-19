import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReactLogo from './ReactLogo';

describe('<ReactLogo />', () => {
  test('it should mount', () => {
    render(<ReactLogo />);
    screen.getByTestId('react-logo');
  });
});