import React, { Component } from 'react';
import { IHomepageState, IHomepageProps } from './Homepage.interface';

class Homepage extends Component<IHomepageProps, IHomepageState> {
  constructor(props: IHomepageProps) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className='bg-cyan-500 h-screen'>kiyoweoo</div>;
  }
}

export default Homepage;
