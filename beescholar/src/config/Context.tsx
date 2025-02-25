import { createContext, useContext, ReactNode, useReducer } from 'react';
import { IMinigameHeader, IStudent } from '../constants/global.interfaces';
import { DummyStudent } from '../constants/dummy.constants';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { dummyStudent } from '../views/skeleton/Skeleton.constants';
import { GetUserData } from './Utilities';
import axios, { Axios } from 'axios';

interface IUserContext {
  user: IStudent | undefined;
  isAuthenticated: boolean;
  isStarted: boolean;
  savedSceneId: string;
  login(payload: { email: string; password: string }): void;
  logout(): void;
  start(): void;
  checkExistingUser(payload: any): void;
  updateUserData(): void;
  updateSavedSceneId(sceneId: string): void;
}

export interface IAuthProviderProps {
  children: ReactNode;
}

interface IUserContextPayload {
  payload?: IStudent;
  sceneId?: string;
  type: string;
}

const defaultValue: IUserContext = {
  user: undefined,
  isAuthenticated: false,
  isStarted: false,
  savedSceneId: '',
  login: () => {},
  logout: () => {},
  start: () => {},
  checkExistingUser: (payload: any) => {},
  updateUserData: () => {},
  updateSavedSceneId: (sceneId: string) => {},
};

function reducer(state: IUserContext, action: IUserContextPayload) {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true };

    case 'logout':
      return {
        ...state,
        user: undefined,
        isAuthenticated: false,
        isStarted: false,
      };

    case 'start':
      return { ...state, isStarted: true };

    case 'check':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'update':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'saveScene':
      return { ...state, isAuthenticated: true };
    default:
      throw new Error('Unknown action in UserContext');
  }
}

const AuthContext = createContext<IUserContext>(defaultValue);

function AuthProvider({ children }: IAuthProviderProps) {
  const [{ user, isAuthenticated, isStarted, savedSceneId }, dispatch] =
    useReducer(reducer, defaultValue);
  const navigate = useNavigate();

  async function login(payload: { email: string; password: string }) {
    let userId;
    let bearerToken: string = '';
    await axios
      .post('http://127.0.0.1:8000/api/login', payload)
      .then(function (response) {
        // console.log(response.data);
        userId = response.data.user.id;
        bearerToken = response.data.token;
      })
      .catch(function (error) {
        alert('Your credentials did not match our database!');
      });
    await axios
      .get(`http://127.0.0.1:8000/api/user`, {
        headers: { Authorization: `Bearer ${bearerToken}` },
      })
      .then((res) => {
        dispatch({
          type: 'login',
          payload: { ...res.data.data, token: bearerToken },
        });
        window.localStorage.setItem(
          'user-beescholar',
          JSON.stringify({ ...res.data.data, token: bearerToken })
        );
      })
      .catch((error) => {
        alert(error);
      });
  }

  async function logout() {
    console.log(user?.token);
    await axios
      .post('http://127.0.0.1:8000/api/logout', '', {
        headers: { Authorization: `Bearer ${user?.token}`, mode: "no-cors" },
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
    window.localStorage.removeItem('user-beescholar');
    if (window.localStorage.getItem('story-beescholar') !== null) {
      window.localStorage.removeItem('story-beescholar');
    }
    dispatch({ type: 'logout' });
  }

  function start() {
    dispatch({ type: 'start' });
    navigate('/game/');
  }

  async function updateUserData() {
    await axios
      .get(`http://127.0.0.1:8000/api/user/`, {
        headers: { Authorization: `Bearer ${user?.token}`, mode: "no-cors" },
      })
      .then((res) => {
        dispatch({ type: 'update', payload: { ...res.data.data, token: user?.token } });
        window.localStorage.removeItem('user-beescholar');
        window.localStorage.setItem(
          'user-beescholar',
          JSON.stringify({ ...res.data.data, token: user?.token })
        );
      })
      .catch((error) => {
        alert('ERROR UPDATING DATA!');
      });
  }

  function updateSavedSceneId(sceneId: string) {
    dispatch({ type: 'saveScene', sceneId });
    if (
      sceneId !== '' &&
      window.localStorage.getItem('story-beescholar') === undefined
    ) {
      window.localStorage.setItem('story-beescholar', JSON.stringify(sceneId));
    } else if (sceneId !== '') {
      window.localStorage.removeItem('story-beescholar');
      window.localStorage.setItem('story-beescholar', JSON.stringify(sceneId));
    }
  }

  function checkExistingUser(payload: any) {
    if (payload !== '' && user === undefined && isAuthenticated === false) {
      dispatch({ type: 'check', payload: payload });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isStarted,
        savedSceneId,
        login,
        logout,
        start,
        checkExistingUser,
        updateUserData,
        updateSavedSceneId,
      }}>
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
