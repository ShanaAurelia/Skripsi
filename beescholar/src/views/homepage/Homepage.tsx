import React, { Component } from 'react';
import { IHomepageState, IHomepageProps } from './Homepage.interface';
import { Button } from '@mui/material';

class Homepage extends Component<IHomepageProps, IHomepageState> {
  constructor(props: IHomepageProps) {
    super(props);
    this.state = {};
  }

  redirect = (to: string) => {
    return window.location.replace(`/${to}`);
  };

  render() {
    return (
      <div className='flex flex-col m-4 h-screen justify-evenly'>
        <Button
          variant='contained'
          onClick={() => this.redirect('story')}
          className='w-max h-max'>
          Story
        </Button>
        <Button
          variant='contained'
          onClick={() => this.redirect('crossword')}
          className='w-max h-max'>
          Crossword
        </Button>
      </div>
    );
  }
}

export default Homepage;
