import React, { Component } from 'react';
import { IStoryProps, IStoryState } from './Story.interface';
import Dialogue from '../../components/dialogue/Scene';
import { DummyDialogue } from '../../constants/dummy.constants';

const Story = (props: IStoryProps) => {
  const BackToHomepage = () => {
    window.location.replace('/home');
  };

  return (
    <div className='bg-black h-screen justify-center flex'>
      <Dialogue
        background={DummyDialogue.background}
        characters={DummyDialogue.characters}
        backToHomepage={() => BackToHomepage()}
      />
    </div>
  );
};

export default Story;
