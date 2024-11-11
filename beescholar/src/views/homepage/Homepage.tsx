import React, { Component } from 'react';
import { IHomepageState, IHomepageProps } from './Homepage.interface';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col m-4 h-screen justify-evenly'>
      <Button
        variant='contained'
        onClick={() => navigate('story', {replace: true})}
        className='w-max h-max'>
        Story
      </Button>
      <Button
        variant='contained'
        onClick={() => navigate('crossword', {replace: true})}
        className='w-max h-max'>
        Crossword
      </Button><Button
        variant='contained'
        onClick={() => navigate('followthedrum', {replace: true})}
        className='w-max h-max'>
        Follow the Drum
      </Button>
      <Button
      variant='contained'
      onClick={() => navigate('profiles', {replace: true})}
      className='w-max h-max'>
        Characters
      </Button>
    </div>
  );
};

export default Homepage;
