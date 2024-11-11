import { createContext, useContext, ReactNode, useReducer } from 'react';
import { IStudent } from '../constants/global.interfaces';
import { DummyStudent } from '../constants/dummy.constants';
import { redirect } from 'react-router-dom';

interface IUserContext {
  user: IStudent | undefined;
  isAuthenticated: boolean;
  login(email: string): void;
  logout(): void;
}

export interface IAuthProviderProps {
  children: ReactNode;
}

interface IUserContextPayload {
  payload?: IStudent;
  type: string;
}

const defaultValue: IUserContext = {
  user: undefined,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

function reducer(state: IUserContext, action: IUserContextPayload) {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true };

    case 'logout':
      return { ...state, user: undefined, isAuthenticated: false };

    default:
      throw new Error('Unknown action in UserContext');
  }
}

const AuthContext = createContext<IUserContext>(defaultValue);

function AuthProvider({ children }: IAuthProviderProps) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    defaultValue
  );

  function login(email: string) {
    if (email === DummyStudent.email) {
      dispatch({ type: 'login', payload: DummyStudent });
    } else throw new Error('No Email Detected');
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === null || context === undefined) {
    throw new Error('AuthContext was used outside AuthProvider');
  }
  return context;
}

export { useAuth, AuthProvider };
