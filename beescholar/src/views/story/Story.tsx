import React, { Component } from 'react';
import { IStoryProps, IStoryState } from './Story.interface';
import Scene from '../../components/dialogue/Scene';
import { DummyDialogue } from '../../constants/dummy.constants';

const Story = (props: IStoryProps) => {
  const BackToHomepage = () => {
    window.location.replace('/home');
  };

  return (
    <div className='bg-black h-screen justify-center flex'>
      <Scene
        background={DummyDialogue.background}
        characters={DummyDialogue.characters}
        backToHomepage={() => BackToHomepage()}
      />
    </div>
  );
};

export default Story;
