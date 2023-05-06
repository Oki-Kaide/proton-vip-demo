import { useEffect, useState } from 'react';
import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(config);

const firebaseService = firebase.firestore();

interface Chat {
  avatar: string;
  date: number;
  msg: string;
  sender: string;
}

export const createMessage = async (
  sender: string,
  msg: string,
  avatar: string
) => {
  const chat = {
    sender,
    msg,
    avatar,
    date: Date.now(),
  };
  await firebaseService.collection('chats').add(chat);
};

export const useFirebaseChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const unsubscribe = firebaseService
      .collection('chats')
      .orderBy('date')
      .onSnapshot((snapshot) => {
        if (snapshot.size) {
          const firebaseChats: Chat[] = [];
          snapshot.forEach((doc) => {
            firebaseChats.push(doc.data() as Chat);
          });
          setChats(firebaseChats);
        }
      });

    return () => unsubscribe();
  }, []);

  return chats;
};

export default firebaseService;
