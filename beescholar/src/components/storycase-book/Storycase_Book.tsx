import React, { useEffect, useState } from 'react';
import {
  DummyStoryCaseMinigame,
  KMGCharacters,
} from '../../constants/dummy.constants';
import './Storycase_Book.css';
import { ICharacter, ISpeech } from '../../constants/global.interfaces';
import { IStorycase } from './Storycase.interfaces';
import Speech from '../speech/Speech';

const StorycaseBook = () => {
  const [storyCaseData, setStoryCaseData] = useState<IStorycase>();
  const [dialogueCount, setDialogueCount] = useState<number>(0);
  const [additionalClass, setAdditionalClass] = useState<string>()

  const placeholderLine:ISpeech = {
    characterExpression: "none",
    characterId: '00',
    speed:1,
    text: "{unknown error occured, cannot fetch line}"
  }

  useEffect(() => {
    setStoryCaseData(DummyStoryCaseMinigame);
    setAdditionalClass("")
  }, []);

  const handleNextDialogue = () => {

  }

  const renderMiddlePart = () => (
    <div
      id='book-middle-part'
      className='h-full w-10 flex flex-col justify-evenly items-center absolute'>
      <div
        id='top-pin'
        className='book-pin'>
        <div
          id='top-pin-container'
          className='pins-container'>
          <div
            id='pin'
            className='left-shadow-pin'
          />
          <div
            id='pin'
            className='right-shadow-pin'
          />
        </div>
        <div
          id='top-pin-container'
          className='pins-container'>
          <div
            id='pin'
            className='left-shadow-pin'
          />
          <div
            id='pin'
            className='right-shadow-pin'
          />
        </div>
      </div>
      <div
        id='book-shadow'
        className='absolute z-0 h-full w-0.5 flex justify-center items-center'>
        <div
          id='left-book-shadow'
          className='shadow-[10px_0_20px_1px_black] h-full w-1/2 '
        />
        <div
          id='right-book-shadow'
          className='shadow-[-10px_0_20px_1px_black] h-full w-1/2 '
        />
      </div>
      <div
        id='top-pin'
        className='book-pin'>
        <div
          id='top-pin-container'
          className='pins-container'>
          <div
            id='pin'
            className='left-shadow-pin'
          />
          <div
            id='pin'
            className='right-shadow-pin'
          />
        </div>
        <div
          id='top-pin-container'
          className='pins-container'>
          <div
            id='pin'
            className='left-shadow-pin'
          />
          <div
            id='pin'
            className='right-shadow-pin'
          />
        </div>
      </div>
    </div>
  );

  const renderLeftPart = () => (
    <div id='left-part-container' className='h-full w-full flex flex-col'>
      <div id='left-part-top' className='h-1/2 w-full flex flex-row justify-evenly'>
        <div
          id='profiles-picture'
          className=' w-1/2 h-full flex justify-center items-center relative'>
          <div
            id='profiles-squareframe'
            className='bg-white h-3/4 w-2/3 border-[#F39F33] border-8'
          />
          <img
            src={storyCaseData?.data.profilePicture}
            className='absolute w-3/4'
          />
        </div>
        <div
          id='case-number-container'
          className='h-full w-1/2 items-center justify-center relative flex flex-col'>
          <div
            id='case-number-title'
            className='w-full flex justify-center items-center'>
            <h3 className='text-black font-semibold text-xl'>CASE NUMBER</h3>
          </div>
          <div
            id='case-container'
            className='w-1/2 h-1/2 flex justify-center items-center m-5 border-8 border-[#81C7E9] rounded-lg'>
            <h3 className='text-black font-bold text-4xl tracking-widest'>
              {storyCaseData?.data.caseNumber}
            </h3>
          </div>
          <div></div>
        </div>
      </div>
      <div
        id='left-part-bottom'
        className='h-1/2 w-full flex flex-col items-center justify-evenly'>
        <div
          id='case-description'
          className='bg-[#81C7E9] w-5/6 p-3 text-center'>
          <p className='text-base font-medium'>
            {storyCaseData?.data.description}
          </p>
        </div>
        <div
          id='case-article-link'
          className='bg-[#81C7E9] w-5/6 p-3 flex flex-row items-center relative text-center'>
          <div
            id='case-help-icon'
            className='w-1/6 h-full items-center'>
            <img src='/component-images/Help-logo.svg' />
          </div>
          <p
            id='article-case'
            className='text-base'>
            You can check{' '}
            <a
              href={storyCaseData?.data.articleLink} target='_blank'
              className='font-medium underline-offset-1 underline'>
              {storyCaseData?.data.articleLink}
            </a>{' '}
            for help in this case.
          </p>
        </div>
      </div>
    </div>
  );

  const renderRightPart = () => (
    <div id='right-part-speech' className='w-full h-full'>
      <div id='speech-container'>

      </div>
    </div>
  )

  const renderBook = () => (
    <div className=' w-5/6 h-5/6 flex flex-row relative justify-center items-center'>
      <div
        id='book-page-left'
        className='bg-white w-1/2 h-full shadow-[1px_0_1px_0_black_inset] overflow-auto overflow-x-hidden relative'>
        {renderLeftPart()}
      </div>
      <div className='w-1/6 h-full absolute flex justify-center'>
      <div className='justify-center items-center flex z-10 absolute h-full w-min'>
      {renderMiddlePart()}
      </div>
      </div>
      <div
        id='book-page-right'
        className=' bg-[#81C7E9] h-full w-1/2 relative'>
        {renderRightPart()}
      </div>
    </div>
  );

  return <>{renderBook()}</>;
};

export default StorycaseBook;
