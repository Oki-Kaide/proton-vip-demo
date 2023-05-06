import React from 'react';
import { render } from '@testing-library/react';
import LoadingPage from '../../pages/Loading';

describe('Loading page', () => {
  test('renders without crashing', () => {
    render(<LoadingPage />);
  });

  test('renders a loading message', () => {
    const { getByText } = render(<LoadingPage />);
    expect(getByText(/Loading.../)).toBeInTheDocument();
  });

  test('renders the Proton logo from the Layout component', () => {
    const { getByRole } = render(<LoadingPage />);
    expect(getByRole('img', { name: 'Proton' })).toBeInTheDocument();
  });
});
