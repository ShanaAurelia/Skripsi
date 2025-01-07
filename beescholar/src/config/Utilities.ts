import { useEffect } from 'react';
import { IAuthProviderProps, useAuth } from './Context';
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const randomAlphaNumeric = (length: number) => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

function RouteProtection({ children }: IAuthProviderProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate('/beescholar');
    },
    [isAuthenticated, navigate]
  );

  return children;
}

function NavigateTo(to: string) {
  const nav = useNavigate();
  return nav(to);
}

export function GetUserData() {
  return JSON.parse(window.localStorage.getItem('user-beescholar') || '');
}

export function GetArticleLink(topic: string) {
  switch (topic) {
    case 'General Information on Academic Activities':
      return 'https://support.binus.ac.id/category/informasi_umum_akademik/?stakeholder=student&parent=3277';
    default:
      return 'https://support.binus.ac.id/';
  }
}

export function HandleIsChangeMusic(){
  const _href = window.location.href;
  if(_href.includes('/story/')){
    return true
  }
  if(_href.includes('/followthedrum') || _href.includes('/storycase') || _href.includes('/crossword')){
    return true
  }
  if(_href.includes('/stage')){
    return true
  }
  if(_href === "localhost:3000/game/" || _href === "localhost:3000/beescholar"){
    return true
  }
  else{
    return false
  }
}

export function HandleMusicType(){
  const _href = window.location.href;
  if(_href.includes('/story')){
    return HandleMusicSource('story');
  }
  if(_href.includes('/followthedrum') || _href.includes('storycase') || _href.includes('/crossword')){
    return HandleMusicSource('minigame')
  }
  if(_href.includes('/stage')){
    return HandleMusicSource('stage')
  }
  else{
    return HandleMusicSource('main')
  }
}

export function HandleMusicSource(
  type: 'main' | 'minigame' | 'stage' | 'story'
) {
  switch (type) {
    case 'main':
      return '/soundtrack/music/main.ogg';
    case 'minigame':
      return '/soundtrack/music/minigame.ogg';
    case 'stage':
      return '/soundtrack/music/stage.ogg';
    case 'story':
      return '/soundtrack/music/story.ogg';
  }
}

export function HandleSFXSound(
  type: 'select' | 'hover' | 'close' | 'error' | 'open'
) {
  switch (type) {
    case 'close':
      return '/soundtrack/sfx/close.ogg';
    case 'error':
      return '/soundtrack/sfx/error.ogg';
    case 'hover':
      return '/soundtrack/sfx/hover.ogg';
    case 'open':
      return '/soundtrack/sfx/open.ogg';
    case 'select':
      return '/soundtrack/sfx/select.ogg';
  }
}

// export function UpdateUserData(){
//   const auth = useAuth();
//   auth.updateUserData();
// }

export default RouteProtection;
