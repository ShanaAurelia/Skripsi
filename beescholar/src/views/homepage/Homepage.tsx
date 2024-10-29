import React, { Component } from 'react';
import { IHomepageState, IHomepageProps } from './Homepage.interface';
import { Button } from '@mui/material';

const Homepage = () => {
  const redirect = (to: string) => {
    return window.location.replace(`/${to}`);
  };

  return (
    <div className='flex flex-col m-4 h-screen justify-evenly'>
      <Button
        variant='contained'
        onClick={() => redirect('story')}
        className='w-max h-max'>
        Story
      </Button>
      <Button
        variant='contained'
        onClick={() => redirect('crossword')}
        className='w-max h-max'>
        Crossword
      </Button><Button
        variant='contained'
        onClick={() => redirect('followthedrum')}
        className='w-max h-max'>
        Follow the Drum
      </Button>
    </div>
  );
};

export default Homepage;
