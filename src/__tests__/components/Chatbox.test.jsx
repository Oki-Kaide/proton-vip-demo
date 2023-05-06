import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Chatbox from '../../components/Chatbox';
import * as Firebase from '../../util/services/firebase.service';
import * as AuthProvider from '../../util/providers/AuthProvider';

describe('Chatbox component', () => {
  const createMessageSpy = jest.spyOn(Firebase, 'createMessage');
  const useFirebaseChatsSpy = jest.spyOn(Firebase, 'useFirebaseChats');
  const useAuthContextSpy = jest.spyOn(AuthProvider, 'useAuthContext');

  beforeAll(() => {
    useAuthContextSpy.mockReturnValue({
      currentUser: { actor: 'test', name: 'test', avatar: 'test' },
    });
  });

  test('renders without crashing', () => {
    useFirebaseChatsSpy.mockReturnValue([
      {
        sender: 'test',
        msg: 'test',
        avatar: 'test',
        date: new Date(),
      },
    ]);

    render(<Chatbox />);
  });

  test('does not create a message by typing the enter key with the shift key', () => {
    const setInput = jest.fn();
    const input = 'test';
    jest.spyOn(React, 'useState').mockReturnValue([input, setInput]);
    render(<Chatbox />);
    const inputField = screen.getByRole('textbox');
    fireEvent.keyDown(inputField, {
      key: 'Enter',
      code: 13,
      charCode: 13,
      shiftKey: true,
    });
    expect(createMessageSpy).toBeCalledTimes(0);
  });

  test('allows a user to click an SVG image or type the enter key (without the shift key) to create a message', () => {
    const setInput = jest.fn();
    const input = 'test';
    jest.spyOn(React, 'useState').mockReturnValue([input, setInput]);

    render(<Chatbox />);

    const images = screen.getAllByRole('img', { hidden: true });
    images.forEach((img) => fireEvent.click(img));
    expect(createMessageSpy).toBeCalledTimes(1);

    const inputField = screen.getByRole('textbox');
    fireEvent.keyDown(inputField, {
      key: 'Enter',
      code: 13,
      charCode: 13,
      shiftKey: false,
    });
    expect(createMessageSpy).toBeCalledTimes(2);
  });

  test('renders a default avatar', () => {
    useFirebaseChatsSpy.mockReturnValue([
      {
        sender: 'test',
        msg: 'test',
        avatar: '',
        date: new Date(),
      },
    ]);

    const { getByRole } = render(<Chatbox />);
    expect(
      getByRole('img', { name: 'test-default-avatar' })
    ).toBeInTheDocument();
  });

  test('renders a user profile avatar if a user has one', () => {
    useFirebaseChatsSpy.mockReturnValue([
      {
        sender: 'test',
        msg: 'test',
        avatar: 'test',
        date: new Date(),
      },
    ]);

    const { getByRole } = render(<Chatbox />);
    expect(getByRole('img', { name: 'test-avatar' })).toBeInTheDocument();
  });
});
