import { createContext, useContext, ReactNode, useReducer } from 'react';
import { IStudent } from '../constants/global.interfaces';
import { DummyStudent } from '../constants/dummy.constants';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { dummyStudent } from '../views/skeleton/Skeleton.constants';
import { GetUserData } from './Utilities';

interface IUserContext {
  user: IStudent | undefined;
  isAuthenticated: boolean;
  isStarted: boolean;
  login(email: string): void;
  logout(): void;
  start(): void;
  checkExistingUser(payload:any): void;
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
  isStarted: false,
  login: () => {},
  logout: () => {},
  start: () => {},
  checkExistingUser: (payload:any) => {}
};

function reducer(state: IUserContext, action: IUserContextPayload) {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true };

    case 'logout':
      return { ...state, user: undefined, isAuthenticated: false, isStarted: false };

    case 'start':
      return{ ...state, isStarted: true}
    
    case 'check':
      return{...state, user:action.payload, isAuthenticated: true}

    default:
      throw new Error('Unknown action in UserContext');
  }
}

const AuthContext = createContext<IUserContext>(defaultValue);

function AuthProvider({ children }: IAuthProviderProps) {
  const [{ user, isAuthenticated, isStarted }, dispatch] = useReducer(
    reducer,
    defaultValue
  );
  const navigate = useNavigate();

  function login(email: string) {
    if (email === DummyStudent.email) {
      dispatch({ type: 'login', payload: DummyStudent });
      window.localStorage.setItem('user-beescholar',JSON.stringify(dummyStudent))
    } else throw new Error('No Email Detected');
  }

  function logout() {
    window.localStorage.removeItem('user-beescholar');
    dispatch({ type: 'logout' });
  }

  function start(){
    dispatch({ type: 'start'})
    navigate('/game/')
  }

  function checkExistingUser(payload:any){
    if(payload !== "" && user === undefined && isAuthenticated === false){
      dispatch({ type: 'check', payload: payload})
    }
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isStarted, login, logout, start, checkExistingUser }}>
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
