import React, { Component, useEffect, useState } from 'react';
import {
  DummyDialogueLine,
  DummyIntroductionDialogue,
} from '../../constants/dummy.constants';
import { IDialogueProps, IDialogueState } from './Scene.interface';
import {
  ICharacter,
  IDialogue,
  IMinigameHeader,
} from '../../constants/global.interfaces';
import Button from '@mui/material/Button';
import Speech from '../speech/Speech';
import Character from './Character';
import { useAuth } from '../../config/Context';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import '../../constants/global.css';
import { Modal } from '@mui/material';

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
  const [minigameData, setMinigameData] = useState<IMinigameHeader>();
  const [openMinigameModal, setOpenMinigameModal] = useState<boolean>();
  const [savedScene, setSavedScene] = useState<boolean>();
  const [nextSceneId, setNextSceneId] = useState<string>();
  const user = useAuth().user;
  const updateUserData = useAuth().updateUserData;
  const updateSavedSceneId = useAuth().updateSavedSceneId;
  const navigate = useNavigate();
  const { sceneStartId } = useParams();

  useEffect(() => {
    if (sceneStartId !== undefined) {
      setIsLoading(true);
      getDialogue(sceneStartId);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, []);

  window.onbeforeunload = function () {
    console.log("a");
    if (!savedScene) {
      updateSavedSceneId(dialogue?.sceneId || '');
      handleProcessDialogue();
      return 'Progress might not be saved, are you sure to leave this page?';
    }
  };

  const handleNextSpeech = () => {
    if (dialogue?.nextSceneId !== undefined && dialogue.nextSceneId !== null) {
      getDialogue(dialogue?.nextSceneId);
    } else if (dialogue?.isEndScene) {
      handleProcessDialogue();
    }
  };

  const getDialogue = async (nextSceneId2: string) => {
    await axios
      .get(`http://127.0.0.1:8000/api/scene/${nextSceneId2}`, {
        headers: { Authorization: `Bearer ${user?.token}`, mode: "no-cors" },
      })
      .then((res) => {
        const _data = res.data.message;
        if (_data.minigameId !== undefined) {
          if (_data.sceneType === 'Minigame' && _data.isEndScene === true) {
            axios
              .post(
                `http://127.0.0.1:8000/api/process_scene/${_data.sceneId}`,
                '',
                { headers: { Authorization: `Bearer ${user?.token}`, mode: "no-cors" } }
              )
              .then((res) => {
                if (res.data.success === true) {
                  handleProcessMinigame(_data.minigameId)
                }
              })
              .catch((error) => {
                console.log(error);
                setIsError(true);
              });
            updateUserData();
            updateSavedSceneId(_data.sceneId || '');
          } else {
            handleProcessMinigame(_data.minigameId);
            setNextSceneId(_data.nextSceneId);
            handleProcessDialogue();
          }
        } else {
          updateSavedSceneId(_data.sceneId || '');
          if (_data.eventId !== undefined) {
            getDialogue(_data.nextSceneId);
          }
          var _dialogue = res.data.message;
          _dialogue.dialogueText = _dialogue.dialogueText.replaceAll(
            '[MC]',
            user?.name
          );
          setDialogue(_dialogue);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  };

  const handleProcessDialogue = () => {
    axios
      .post(
        `http://127.0.0.1:8000/api/process_scene/${dialogue?.sceneId}`,
        '',
        { headers: { Authorization: `Bearer ${user?.token}`, mode: "no-cors" } }
      )
      .then((res) => {
        if (res.data.success === true && dialogue?.isEndScene) {
          setEndScene(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
    updateUserData();
    updateSavedSceneId(dialogue?.sceneId || '');
  };

  const handleProcessMinigame = (minigameId: string) => {
    axios
      .get(`http://127.0.0.1:8000/api/minigame/${minigameId}`, {
        headers: { Authorization: `Bearer ${user?.token}`, mode: "no-cors" },
      })
      .then((res) => {
        setMinigameData(res.data.message);
        setOpenMinigameModal(true);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  };

  const handleNavigateMinigame = () => {
    const type = minigameData?.minigameType;

    switch (type) {
      case 'Quiz':
        if (minigameData?.quizType === 'Stage') {
          return navigate(
            `/game/stage/${minigameData?.minigameId}/${nextSceneId}`,
            { replace: true }
          );
        } else {
          return navigate(
            `/game/storycase/${minigameData?.minigameId}/${minigameData?.quizQuestions[0].characterName}/${nextSceneId}`,
            { replace: true }
          );
        }
      case 'Drum Puzzle':
        return navigate(
          `/game/followthedrum/${minigameData?.minigameId}/${nextSceneId}`,
          { replace: true }
        );
      case 'Crossword':
        return navigate(`/game/crossword/${minigameData?.minigameId}`);
    }
  };

  const handleOptionDialogue = (nextSceneId: string) => {
    getDialogue(nextSceneId);
  };

  return (
    <div
      id='dialogue-skeleton'
      className='flex justify-center w-full h-full overflow-hidden relative flex-row'>
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
        className='z-10 w-full h-3/4 flex flex-row justify-center items-center relative'>
        {/* {props.characters.map((char, idx) => (
          <Character
            src={char.image}
            isActive={char.id === activeCharacter}
            position={idx % 2 == 0 ? 'left' : 'right'}
          />
        ))} */}

        <img
          src={dialogue?.characterImage}
          className=' bottom-0 w-2/5 h-min'
        />
      </div>
      <div
        id='dialogue-background'
        className='bg-black z-10 w-full h-1/4 absolute bottom-0'>
        <Speech
          key={`dlg-${dialogue?.sceneId}`}
          character={
            dialogue?.characterName.replace('[MC]', user?.name || '') || ''
          }
          line={dialogue?.dialogueText || ''}
          speed={4}
          class={[]}
          isLoading={isLoading}
          isDisableNext={dialogue?.nextSceneId === null}
          handleNext={handleNextSpeech}
        />
      </div>
      {dialogue?.nextSceneId === null && !dialogue.isEndScene && (
        <>
          <div
            id='option'
            className='absolute z-50 w-full h-full'>
            <div
              id='backdrop'
              className='bg-black opacity-60 w-full h-full absolute'></div>
            <div
              id='option-container'
              className='w-full h-full relative flex flex-col justify-center items-center'>
              {dialogue.options?.map((opt) => (
                <div
                  id='button-container'
                  className='w-max h-max p-5 flex items-center justify-center'>
                  <button
                    className='beescholar-button text-xl font-semibold p-5'
                    onClick={() => handleOptionDialogue(opt.nextSceneId)}>
                    {opt.optionText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {openMinigameModal && (
        <Modal
          key={Math.random()}
          open={openMinigameModal}
          className='w-full h-full flex justify-center items-center'
          disableScrollLock={true}>
          <div
            id='task-modal-container'
            className='w-11/12 h-3/4 bg-[#C06C00] flex flex-col rounded-xl border-black border-4'>
            <div
              id='task-modal-title-container'
              className='flex justify-center items-center w-full h-1/4 relative'>
              <div
                id='task-modal-title-box'
                className='bg-[#F3931B] w-1/2 h-min p-3 rounded-md shadow-xl border-black border-2 absolute -top-10 text-center'>
                <h4 className='text-white font-semibold tracking-widest text-2xl'>
                  MINIGAME
                </h4>
              </div>
              <button
                id='close-modal-button'
                className='absolute right-5 top-5 text-4xl text-black bg-white w-20 h-20 2 hover:outline-2 hover:outline hover:outline-black rounded-full'
                onClick={() => setOpenMinigameModal(false)}>
                ❌
              </button>
            </div>
            <div
              id='task-modal-body-container'
              className='w-full h-1/2 flex flex-row justify-evenly items-center'>
              <div
                id='profiles-picture'
                className=' w-1/4 h-full flex justify-center items-center relative'>
                <div
                  id='profiles-squareframe'
                  className='bg-white h-5/6 w-1/2 rounded-md border-black border-2 shadow-xl'
                />
                <img
                  src={
                    '/characters/aset merch BINUS Support 3 - bahagia copy.png'
                  }
                  className='absolute w-full'
                />
              </div>
              <div
                id='task-modal-descriptions-container'
                className='w-1/2 h-full flex flex-col justify-evenly relative'>
                <div
                  id='task-modal-descriptions'
                  className='w-full h-3/4 bg-white rounded-t-xl shadow-xl border-black border-2 flex-col p-2 '>
                  <div
                    id='task-modal-description-header'
                    className='w-full h-1/4 text-center '>
                    <h5 className='text-white bg-[#F3931B] font-semibold tracking-wider text-xl p-2 '>
                      {minigameData?.minigameName}
                    </h5>
                  </div>
                  <div
                    id='task-modal-description-body'
                    className='w-full h-3/4 pt-3 flex justify-between flex-col'>
                    <p className='text-black font-medium tracking-wide text-lg'>
                      {minigameData?.instruction}
                    </p>
                    <p className='text-black font-medium tracking-wide text-lg'>
                      {minigameData?.minigameType === 'Drum Puzzle'
                        ? 'Required Hit: ' + minigameData.totalHit
                        : 'Hint: ' + (minigameData?.hint ?? "None")}
                    </p>
                  </div>
                </div>
                <div
                  id='button-container'
                  className='w-full h-max flex justify-end flex-row'>
                  <button
                    id='go-button'
                    className='beescholar-success-button border-2 border-black hover:border-2 rounded-lg p-3 font-bold text-lg tracking-wider  hover:border-black'
                    onClick={() => handleNavigateMinigame()}>
                    LETS GO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {endScene && (
        <Modal
          key={Math.random()}
          open={endScene}
          className='w-full h-full flex justify-center items-center'
          disableScrollLock={true}>
          <div
            id='end-modal-container'
            className='w-11/12 h-3/4 bg-[#C06C00] flex flex-col rounded-xl border-black border-4'>
            <div
              id='end-modal-title-container'
              className='flex justify-center items-center w-full h-1/4 relative'>
              <div
                id='end-modal-title-box'
                className='bg-[#F3931B] w-1/2 h-min p-3 rounded-md shadow-xl border-black border-2 absolute -top-10 text-center'>
                <h4 className='text-white font-semibold tracking-widest text-2xl'>
                  STORY COMPLETED!
                </h4>
              </div>
              {/* <button
                id='close-modal-button'
                className='absolute right-5 top-5 text-4xl text-black bg-white w-20 h-20 2 hover:outline-2 hover:outline hover:outline-black rounded-full'
                onClick={() => setOpenMinigameModal(false)}>
                ❌
              </button> */}
            </div>
            <div
              id='end-modal-body-container'
              className='w-full h-1/2 flex flex-row justify-evenly items-center'>
              <div
                id='profiles-picture'
                className=' w-1/4 h-full flex justify-center items-center relative'>
                <div
                  id='profiles-squareframe'
                  className='bg-white h-5/6 w-1/2 rounded-md border-black border-2 shadow-xl'
                />
                <img
                  src={
                    '/characters/aset merch BINUS Support 3 - bahagia copy.png'
                  }
                  className='absolute w-full'
                />
              </div>
              <div
                id='end-modal-descriptions-container'
                className='w-1/2 h-full flex flex-col justify-evenly relative'>
                <div
                  id='end-modal-descriptions'
                  className='w-full h-3/4 bg-white rounded-t-xl shadow-xl border-black border-2 flex-col p-2 '>
                  <div
                    id='end-modal-description-header'
                    className='w-full h-1/4 text-center '>
                    <h5 className='text-white bg-[#F3931B] font-semibold tracking-wider text-xl p-2 '>
                      YOU HAVE COMPLETED THE CURRENT SCENE
                    </h5>
                  </div>
                  <div
                    id='end-modal-description-body'
                    className='w-full h-3/4 pt-3 flex justify-between flex-col'>
                    <p className='text-black font-medium tracking-wide text-lg'>
                      Search the campus for more storylines!
                    </p>
                  </div>
                </div>
                <div
                  id='button-container'
                  className='w-full h-max flex justify-end flex-row'>
                  <button
                    id='go-button'
                    className='beescholar-success-button border-2 border-black hover:border-2 rounded-lg p-3 font-bold text-lg tracking-wider  hover:border-black'
                    onClick={() => navigate(`/game/map`, { replace: true })}>
                    LETS GO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Scene;
