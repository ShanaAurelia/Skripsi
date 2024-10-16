import React, { Component } from 'react';
import { IHomepageState, IHomepageProps } from './Homepage.interface';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

class Homepage extends Component<IHomepageProps, IHomepageState> {
  constructor(props: IHomepageProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='flex flex-col m-4'>
        <Link to={'/story'}>
          <Button variant='contained'> Story</Button>
        </Link>
      </div>
    );
  }
}

export default Homepage;
