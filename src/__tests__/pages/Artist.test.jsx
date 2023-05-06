import React from 'react';
import { render } from '@testing-library/react';
import ArtistPage from '../../pages/Artist';

describe('ArtistPage component', () => {
  test('renders without crashing', () => {
    render(<ArtistPage />);
  });
});
