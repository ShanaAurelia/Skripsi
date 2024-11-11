import React, { Component } from 'react';
import { IMainpageProps } from './LandingPage.interface';
import { Button } from '@mui/material';
import { useAuth } from '../../config/Context';
import { redirect } from 'react-router-dom';

const Mainpage = (props: IMainpageProps) => {
  const user = useAuth();

  const handleStart = () =>{
    if(user.user !== undefined) window.location.replace("/home")
  }

  return (
    <div
      className='bg-black h-screen object-bottom flex'
      id='mainpage'>
        <img
        className='h-full w-full object-fill opacity-70'
          src='./backgrounds/dummy-mainpage.png'
        />
        <div className='w-screen h-1/4 justify-items-center absolute bottom-0 object-none'>
      <div
        id='start-container'
        className='relative z-10 p-2'>
          <Button variant='contained' color='warning' onClick={handleStart}>Start</Button>
        </div>
        </div>
    </div>
  );
};

export default Mainpage;
