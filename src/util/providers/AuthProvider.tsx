import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useHistory } from 'react-router-dom';
import ProtonService from '../services/proton.service';
import firebaseService from '../services/firebase.service';

export type User = {
  actor: string;
  permission: string;
  avatar: string;
  createdAt: Date;
  name: string;
  isMember?: boolean;
  memberLevel?: string;
};

interface AuthResponse {
  success: boolean;
  user?: any;
  error?: any;
}

interface AuthContext {
  currentUser: User;
  error: string;
  authenticate: () => Promise<User | void>;
  signup: (dataCost: number, dataId: string) => Promise<void>;
  signout: () => void;
}

interface AuthProviderProps {
  children: JSX.Element;
}

interface Member {
  user: string;
  level: string;
}

export const defaultCurrentUser = {
  actor: '',
  permission: '',
  avatar: '',
  createdAt: new Date(),
  name: '',
  isMember: false,
  memberLevel: '',
};

const authContext = createContext<AuthContext>({
  currentUser: defaultCurrentUser,
  authenticate: () => Promise.resolve(),
  signout: () => {},
  signup: () => Promise.resolve(),
  error: '',
});

export const useAuthContext = (): AuthContext => {
  const { currentUser, authenticate, signout, signup, error } = useContext(
    authContext
  );

  return {
    currentUser,
    authenticate,
    signout,
    signup,
    error,
  };
};

export const timeout = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

const usePrevious = (value: string): string => {
  const ref = useRef<string>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current as string;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState<User>(defaultCurrentUser);
  const [error, setError] = useState('');

  const prevError = usePrevious(error);
  useEffect(() => {
    if (prevError) {
      setError('');
    }
  }, [prevError]);

  useEffect(() => {
    const token: string = localStorage.getItem('AUTH_USER_PROTON_VIP') || '';
    if (token) {
      const initialUser = JSON.parse(token);
      ProtonService.restoreSession();
      setCurrentUser(initialUser);
    }

    document.addEventListener('backToSelector', () => {
      authenticate();
    });
  }, []);

  const authenticate = async (): Promise<User | void>=> {
    let { user, error } = await ProtonService.login();

    if (!user) {
      setError('Error: No user was found');
      return;
    }

    if (error) {
      setError(`Error: ${error}`);
      return;
    }

    const query = await firebaseService
      .collection('members')
      .where('user', '==', user.actor)
      .get();

    if (!query.empty) {
      let member: Member = { level: '', user: '' };
      query.forEach((doc) => {
        member = doc.data() as Member;
      });
      user.isMember = true;
      user.memberLevel = member.level;
    }

    localStorage.setItem('AUTH_USER_PROTON_VIP', JSON.stringify(user));
    setCurrentUser(user);

    return user;
  };

  const updateMember = async (user: User, level: string) => {
    user.isMember = true;
    user.memberLevel = level;
    localStorage.setItem('AUTH_USER_PROTON_VIP', JSON.stringify(user));
    setCurrentUser(Object.assign({}, user));
  };

  const signout = async () => {
    await ProtonService.logout();
    localStorage.removeItem('AUTH_USER_PROTON_VIP');
    setCurrentUser(defaultCurrentUser);
  };

  const signup = async (dataCost: number, dataId: string) => {
    let user = currentUser;
    if (!user.actor) {
      const resultUser = await authenticate();
      user = resultUser as User;
      await timeout(4000);
    }

    const id = await ProtonService.sendTransaction(dataCost, dataId);
    await updateMember(user, dataId);
    if (!id) {
      history.push('/');
    }
  };

  const authState = useMemo<AuthContext>(
    () => ({
      currentUser,
      authenticate,
      signout,
      signup,
      error,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser, error]
  );

  return (
    <authContext.Provider value={authState}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
