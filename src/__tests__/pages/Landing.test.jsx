import React from 'react';
import { render } from '@testing-library/react';
import Landing from '../../pages/Landing';

describe('Landing page', () => {
  test('renders without crashing', () => {
    render(<Landing />);
  });

  test('renders artist info on landing page', () => {
    const { getByText } = render(<Landing />);
    expect(getByText(/Amanda/)).toBeInTheDocument();
    expect(getByText(/Montgomery/)).toBeInTheDocument();
    expect(getByText(/Country Star/)).toBeInTheDocument();
    expect(getByText(/Song Writer/)).toBeInTheDocument();
  });
});
