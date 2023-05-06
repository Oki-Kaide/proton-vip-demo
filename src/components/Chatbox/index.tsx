import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Column,
  ArtistName,
  ChatContainer,
  InputContainer,
  ChatItem,
} from './index.styled';
import { AMANDA_DATA } from '../../util/constants/amanda-data.constant';
import {
  createMessage,
  useFirebaseChats,
} from '../../util/services/firebase.service';
import { useAuthContext } from '../../util/providers/AuthProvider';

interface Chat {
  date: number;
  avatar: string;
  sender: string;
  msg: string;
}

const Chatbox = () => {
  const { firstName, lastName } = AMANDA_DATA;
  const { currentUser } = useAuthContext();
  const chats: Chat[] = useFirebaseChats();
  const chatlist = useRef<HTMLUListElement | null>(null);
  const [input, setInput] = React.useState('');

  useEffect(() => {
    if (chats.length && chatlist && chatlist.current) {
      chatlist.current.scrollTop = chatlist.current.scrollHeight;
    }
  }, [chats.length]);

  const sendChat = () => {
    const { avatar, name } = currentUser;
    createMessage(name, input, avatar);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isValidEnterKeyDown = e.key === 'Enter' && e.shiftKey === false;
    if (isValidEnterKeyDown) sendChat();
  };

  return (
    <Column>
      <ArtistName>
        {firstName}
        <span>{lastName}</span>
      </ArtistName>
      <ChatContainer>
        <ul ref={chatlist}>
          {chats.map(({ date, msg, avatar, sender }) => (
            <ChatItem key={`${date}-${sender}`}>
              <img
                alt={avatar ? `${sender}-avatar` : `${sender}-default-avatar`}
                src={
                  avatar
                    ? `data:image/jpeg;base64,${avatar}`
                    : './default-avatar.png'
                }
              />
              <p>{msg}</p>
            </ChatItem>
          ))}
        </ul>
      </ChatContainer>
      <InputContainer>
        <input
          type="text"
          value={input}
          placeholder="Type something..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <FontAwesomeIcon onClick={sendChat} icon="paper-plane" size="sm" />
      </InputContainer>
    </Column>
  );
};

export default Chatbox;
