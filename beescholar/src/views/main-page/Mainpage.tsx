import React, { Component } from 'react';
import { IMainpageProps } from './Mainpage.interface';
import { Button } from '@mui/material';

const Mainpage = (props: IMainpageProps) => {
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
          <Button variant='contained' color='warning' onClick={() => {}}>Start</Button>
        </div>
        </div>
    </div>
  );
};

export default Mainpage;
