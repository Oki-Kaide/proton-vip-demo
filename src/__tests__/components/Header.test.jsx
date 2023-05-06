import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';
import * as AuthProvider from '../../util/providers/AuthProvider';

describe('Header component', () => {
  const useAuthContextSpy = jest.spyOn(AuthProvider, 'useAuthContext');

  test('renders without crashing', () => {
    render(<Header />);
  });

  test('renders a login button if not logged in', () => {
    useAuthContextSpy.mockReturnValue({
      currentUser: { actor: '', avatar: '' },
      signout: jest.fn(),
      authenticate: jest.fn(),
    });
    const { getByText } = render(<Header />);
    expect(getByText(/LOGIN/)).toBeInTheDocument();
  });

  test('renders a logout button if logged in', () => {
    useAuthContextSpy.mockReturnValue({
      currentUser: { actor: 'test', avatar: '' },
      signout: jest.fn(),
      authenticate: jest.fn(),
    });

    const { getByText } = render(<Header />);
    expect(getByText(/LOGOUT/)).toBeInTheDocument();
  });

  test('renders an avatar if logged in', () => {
    useAuthContextSpy.mockReturnValue({
      currentUser: { actor: 'test', avatar: '' },
      signout: jest.fn(),
      authenticate: jest.fn(),
    });

    const { getByRole } = render(<Header />);
    expect(getByRole('img', { name: 'avatar-default' })).toBeInTheDocument();
  });

  test('renders a user profile avatar if a user has one', () => {
    useAuthContextSpy.mockReturnValue({
      currentUser: { actor: 'test', avatar: 'test' },
      signout: jest.fn(),
      authenticate: jest.fn(),
    });

    const { getByRole } = render(<Header />);
    expect(getByRole('img', { name: 'avatar-test' })).toBeInTheDocument();
  });
});
