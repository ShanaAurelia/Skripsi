import React, { Component, useEffect, useState } from 'react';
import {
  DummyDialogueLine,
  DummyIntroductionDialogue,
} from '../../constants/dummy.constants';
import { IDialogueProps, IDialogueState } from './Scene.interface';
import { ICharacter, IDialogue } from '../../constants/global.interfaces';
import Button from '@mui/material/Button';
import Speech from '../speech/Speech';
import Character from './Character';
import { useAuth } from '../../config/Context';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import '../../constants/global.css';

// const initialDialogue:IDialogue = {
//   index: 0,
//   line: {
//     characterExpression: '',
//     characterId: '',
//     speed: 1,
//     text: 'no text found',
//   },
// }

const Scene = (props: IDialogueProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [activeCharacter, setActiveCharacter] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [endScene, setEndScene] = useState<boolean>(false);
  const [dialogue, setDialogue] = useState<IDialogue>();
  const user = useAuth().user;
  const updateUserData = useAuth().updateUserData;
  const navigate = useNavigate();
  const { sceneStartId } = useParams();

  useEffect(() => {
    console.log(sceneStartId);
    if (sceneStartId !== undefined) {
      setIsLoading(true);
      getDialogue(sceneStartId);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, []);

  useEffect(() => {}, [dialogue]);

  const handleNextSpeech = () => {
    if (dialogue?.nextSceneId !== undefined && dialogue.nextSceneId !== null) {
      getDialogue(dialogue?.nextSceneId);
    } else if(dialogue?.isEndScene) {
      handleProcessDialogue();
    }
  };

  const getDialogue = async (nextSceneId: string) => {
    await axios
      .get(`http://127.0.0.1:8000/api/scene/${nextSceneId}`)
      .then((res) => {
        var _dialogue = res.data.message;
        _dialogue.dialogueText = _dialogue.dialogueText.replaceAll(
          '[MC]',
          user?.name
        );
        setDialogue(_dialogue);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  };

  const handleProcessDialogue = () => {
    axios
      .post(`http://127.0.0.1:8000/api/process_scene/${dialogue?.sceneId}`)
      .then((res) => {
        if(res.data.message === "Scene successfully processed"){
          setEndScene(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
    updateUserData()
  };

  const handleOptionDialogue = (nextSceneId: string) => {
    getDialogue(nextSceneId);
  }

  return (
    <div
      id='dialogue-skeleton'
      className='flex justify-center w-full h-full overflow-hidden relative'>
      <div
        id='dialogue-background'
        className='absolute overflow-hidden w-full h-full'>
        <img
          src={dialogue?.background}
          className='object-fill w-full h-full opacity-60 bg-black'
        />
      </div>
      <div
        id='character-background'
        className='z-10 w-full h-5/6 absolute bottom-0 flex flex-row justify-between'>
        {/* {props.characters.map((char, idx) => (
          <Character
            src={char.image}
            isActive={char.id === activeCharacter}
            position={idx % 2 == 0 ? 'left' : 'right'}
          />
        ))} */}
        <div
          id='character'
          className='w-1/4 h-1/2 absolute z-30'>
          <img
            src={dialogue?.characterImage}
            className=''
          />
        </div>
      </div>
      <div
        id='dialogue-background'
        className='bg-black z-30 w-full h-1/3 absolute bottom-0'>
        <Speech
          key={`dlg-${dialogue?.sceneId}`}
          character={
            dialogue?.characterName.replace('[MC]', user?.name || '') || 'ERR!'
          }
          line={dialogue?.dialogueText || 'Failed to fetch dialogue data'}
          speed={4}
          class={[]}
          isLoading={isLoading}
          isDisableNext={(dialogue?.nextSceneId === null)}
          handleNext={handleNextSpeech}
        />
      </div>
      {dialogue?.nextSceneId === null && !dialogue.isEndScene && (
        <>
        <div id='option' className='absolute z-50 w-full h-full'>
          <div id='backdrop' className='bg-black opacity-60 w-full h-full absolute'>
          </div>
          <div id='option-container' className='w-full h-full relative flex flex-col justify-center items-center'>
            {dialogue.options?.map((opt) => (
              <div id='button-container' className='w-max h-max p-5 flex items-center justify-center'>
                <button className='beescholar-button text-xl font-semibold p-5' onClick={() => handleOptionDialogue(opt.nextSceneId)}>{opt.optionText}</button>
              </div>
            ))}
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default Scene;
