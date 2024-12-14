import React, { Component } from 'react';
import { IHomepageState, IHomepageProps } from './Homepage.interface';
import { Button } from '@mui/material';
import './Homepage.css';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  //#region {commented on 24/11/2024} temp main page before high-fidelity design
  // return (
  //   <div className='flex flex-col m-4 h-screen justify-evenly'>
  //     <Button
  //       variant='contained'
  //       onClick={() => navigate('story', {replace: true})}
  //       className='w-max h-max'>
  //       Story
  //     </Button>
  //     <Button
  //       variant='contained'
  //       onClick={() => navigate('crossword', {replace: true})}
  //       className='w-max h-max'>
  //       Crossword
  //     </Button><Button
  //       variant='contained'
  //       onClick={() => navigate('followthedrum', {replace: true})}
  //       className='w-max h-max'>
  //       Follow the Drum
  //     </Button>
  //     <Button
  //     variant='contained'
  //     onClick={() => navigate('profiles', {replace: true})}
  //     className='w-max h-max'>
  //       Characters
  //     </Button>
  //   </div>
  // );
  //#endregion
  return (
    <div
      id='home-container'
      className='h-screen w-full bg-[#014769] items-center flex justify-center'>
      <div
        id='background'
        className='flex justify-center items-center h-full w-5/6 relative'>
        <div
          id='menu-container'
          className='z-10 bg-white h-5/6 w-1/3 flex flex-col items-center justify-evenly'>
          <button
            id='play-story-button'
            className='menu-button'
            onClick={() => navigate('story', { replace: true })}>
            {' '}
            PLAY STORY{' '}
          </button>
          <button
            id='characters-button'
            className='menu-button'
            onClick={() => navigate('profiles', { replace: true })}>
            {' '}
            CHARACTERS{' '}
          </button>
          <button
            id='campus-map-button'
            className='menu-button'
            onClick={() => navigate('map', { replace: true })}>
            {' '}
            CAMPUS MAP{' '}
          </button>
          <button
            id='leaderboard-button'
            className='menu-button'
            onClick={() => navigate('leaderboard', { replace: true })}>
            {' '}
            LEADERBOARD{' '}
          </button>
          <button
            id='tutorial-button'
            className='menu-button'>
            {' '}
            TUTORIAL{' '}
          </button>
        </div>
        <img
          src='/backgrounds/dummy-classroom.jpeg'
          className='w-5/6 h-5/6 '
        />
        <button id='crossword-available' className='absolute w-10 h-10 top-20 right-5 bg-white border-red-600 border-2 rounded-full items-center justify-center flex' onClick={() => navigate('crossword', {replace: true})}>
          <h3 className='font-bold text-2xl'>‼️</h3>
        </button>
      </div>
    </div>
  );
};

export default Homepage;
