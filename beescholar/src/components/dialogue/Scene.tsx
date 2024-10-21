import React, { Component, useEffect, useState } from 'react';
import { DummyDialogueLine } from '../../constants/dummy.constants';
import { IDialogueProps, IDialogueState } from './Scene.interface';
import { ICharacter, IDialogue } from '../../constants/global.interfaces';
import Button from '@mui/material/Button';
import Speech from '../speech/Speech';
import Character from './Character';

const initialDialogue:IDialogue = {
  index: 0,
  line: {
    characterExpression: '',
    characterId: '',
    speed: 1,
    text: 'no text found',
  },
}

const Dialogue = (props: IDialogueProps) =>  {

  const [activeCharacter, setActiveCharacter] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dialogue, setDialogue] = useState<IDialogue>(initialDialogue);

  useEffect(() =>{
    setDialogue(DummyDialogueLine[currentIndex])
    setActiveCharacter(DummyDialogueLine[currentIndex].line.characterId)
  }, [currentIndex])

  const handleNextSpeech = () => {
    dummyApiCall();
  };

  const dummyApiCall = () => {
    if (DummyDialogueLine[currentIndex+1] !== undefined) { 
      setCurrentIndex(currentIndex+1)
    } else {
      props.backToHomepage();
    }
  };

    return (
      <div
        id='dialogue-skeleton'
        className='flex justify-center w-full h-full overflow-hidden relative'>
        <div
          id='dialogue-background'
          className='absolute overflow-hidden w-full h-full'>
          <img
            src={props.background}
            className='object-fill w-full h-full opacity-60 bg-black'
          />
        </div>
        <div
          id='character-background'
          className='z-10 w-full h-5/6 absolute bottom-0 flex flex-row justify-between'>
          {props.characters.map((char, idx) => (
            <Character
              src={char.picture}
              isActive={char.id === activeCharacter}
              position={idx % 2 == 0 ? 'left' : 'right'}
            />
          ))}
        </div>
        <div
          id='dialogue-background'
          className='bg-black z-30 w-full h-1/3 absolute bottom-0'>
          {
            <Speech
            key={`dlg-${DummyDialogueLine[currentIndex].index}`}
              character={
                props.characters.find((char) => char.id === dialogue.line.characterId)
                  ?.name || 'Placeholder'
              }
              line={dialogue.line.text}
              speed={dialogue.line.speed}
              class={[]}
              handleNext={handleNextSpeech}
            />
          }
        </div>
      </div>
    );
  }

export default Dialogue;
