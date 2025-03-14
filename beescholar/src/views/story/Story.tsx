import React, { Component } from 'react';
import { IStoryProps, IStoryState } from './Story.interface';
import Scene from '../../components/dialogue/Scene';
import { DummyDialogue } from '../../constants/dummy.constants';
import { useNavigate } from 'react-router-dom';

const Story = (props: IStoryProps) => {
  const navigate = useNavigate();
  return (
    <div className='bg-black h-screen justify-center flex'>
      <Scene
        background={DummyDialogue.background}
        characters={DummyDialogue.characters}
        backToHomepage={() => navigate('/game/')}
      />
    </div>
  );
};

export default Story;
