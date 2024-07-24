import React, { Component } from 'react';
import { IHomepageState, IHomepageProps } from './Homepage.interface';
import Dialogue from '../../components/dialogue/Dialogue';
import { DummyDialogue } from '../../constants/dummy.constants';

class Homepage extends Component<IHomepageProps, IHomepageState> {
  constructor(props: IHomepageProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='bg-cyan-500 h-screen justify-center flex'>
        <Dialogue
          background={DummyDialogue.background}
          characters={DummyDialogue.characters}
        />
      </div>
    );
  }
}

export default Homepage;
