import React, { Component } from 'react';
import { IStoryProps, IStoryState } from './Story.interface';
import Dialogue from '../../components/dialogue/Scene';
import { DummyDialogue } from '../../constants/dummy.constants';

class Story extends Component<IStoryProps, IStoryState> {
  constructor(props: IStoryProps) {
    super(props);
    this.state = {
      example: 'this is an example',
    };
  }

  BackToHomepage = () => {
    window.location.replace("/home");
  }

  render() {
    const { example } = this.state;
    return (
      <div className='bg-black h-screen justify-center flex'>
        <Dialogue
          background={DummyDialogue.background}
          characters={DummyDialogue.characters}
          backToHomepage={() => this.BackToHomepage()}
        />
      </div>
    );
  }
}

export default Story;
