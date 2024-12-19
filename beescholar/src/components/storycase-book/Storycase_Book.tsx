import React, { useEffect, useState } from 'react';
import {
  DummyStoryCaseMinigame,
  DummyStoryCaseSpeech,
  KMGCharacters,
} from '../../constants/dummy.constants';
import './Storycase_Book.css';
import '../../constants/global.css';
import { IStorycase, IStoryCaseSpeech } from './Storycase.interfaces';
import { useAuth } from '../../config/Context';
import { useNavigate } from 'react-router-dom';

const StorycaseBook = () => {
  const [storyCaseData, setStoryCaseData] = useState<IStorycase>();
  const [storyCaseSpeech, setStoryCaseSpeech] = useState<IStoryCaseSpeech>();
  const [loading, setLoading] = useState<boolean>(false);
  const [saveSpeech, setSaveSpeech] = useState<string[]>([]);
  const [chosenOption, setChosenOption] = useState<string>('');
  const [satisfied, setSatisfied] = useState<boolean>();
  const [dialogueCount, setDialogueCount] = useState<number>(0);

  const Auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setStoryCaseData(DummyStoryCaseMinigame);
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 500);
    setTimeout(() => {
      setDialogueCount(1)
      setLoading(true)
    }, 1500);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setStoryCaseSpeech(DummyStoryCaseSpeech[dialogueCount]);
  }, [dialogueCount]);

  useEffect(() => {
    setTimeout(() => {
      setSatisfied(storyCaseSpeech?.dialogueBubble?.isSatisfactory);
    }, 2000);
  }, [storyCaseSpeech?.dialogueBubble?.isSatisfactory]);

  useEffect(() => {
    // use effect for saving state data (make scrollable chat history-kinda)
    if (saveSpeech?.length === 0 && storyCaseSpeech?.dialogueBubble) {
      // only works for first speech bubble.
      setSaveSpeech([storyCaseSpeech.dialogueBubble.text]);
    } else if (chosenOption !== '') {
      // only work to save player option
      setSaveSpeech((curr) => {
        if (chosenOption) {
          return [...curr, chosenOption];
        }
        return curr;
      });
      setChosenOption('');
    } else if (storyCaseSpeech?.dialogueBubble) {
      // only work for next speech bubbles that is not a player option
      setSaveSpeech((curr) => {
        if (storyCaseSpeech.dialogueBubble) {
          return [...curr, storyCaseSpeech.dialogueBubble.text];
        }
        return curr;
      });
    }
  }, [dialogueCount]);

  const handleNextDialogue = (opt: string) => {
    setChosenOption(opt);
    setLoading(true);
    setTimeout(() => {
      setDialogueCount(dialogueCount + 1);
    }, 500);
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  };

  const handleChoiceIndex = (idx: number) => {
    switch (idx) {
      case 0:
        return 'A';
      case 1:
        return 'B';
      case 2:
        return 'C';
      case 3:
        return 'D';
      default:
        return 'Err';
    }
  };

  const handleDisplaySavedDialogue = (speech: string) => {
    const speechBubble = speech;
    return <p className='text-left text-lg font-medium'>{speech}</p>;
  };

  const handleDisplayDialogue = (speech: IStoryCaseSpeech) => {
    const speechBubble = speech;
    if (speechBubble?.dialogueBubble) {
      return (
        <p className='text-left text-lg font-medium'>
          {speechBubble.dialogueBubble.text}
        </p>
      );
    }
    if (speechBubble?.speechOption) {
      const optionBubble = speechBubble.speechOption;
      return (
        <>
          {optionBubble.map((opt, idx) => (
            <button
              id='option-container'
              className='beescholar-button p-1 w-11/12 h-min flex flex-row rounded-lg mb-3 items-center'
              onClick={() => handleNextDialogue(opt.optionText)}>
              <div
                id='option-index'
                className='bg-[#d26b1c] w-11 h-10 flex justify-center items-center text-center rounded-full mr-3'>
                <h3 className='text-lg font-bold'>{handleChoiceIndex(idx)}</h3>
              </div>
              <div
                id='option-text'
                className='text-base font-medium text-start'>
                {opt.optionText}
              </div>
            </button>
          ))}
        </>
      );
    }
  };

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
    <div
      id='left-part-container'
      className='h-full w-full flex flex-col'>
      <div
        id='left-part-top'
        className='h-1/2 w-full flex flex-row justify-evenly'>
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
          className='bg-[#4EB0E1] w-5/6 p-3 text-center'>
          <p className='text-base font-medium text-white'>
            {storyCaseData?.data.description}
          </p>
        </div>
        <div
          id='case-article-link'
          className='bg-[#4EB0E1] w-5/6 p-3 flex flex-row items-center relative text-center text-white'>
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
              href={storyCaseData?.data.articleLink}
              target='_blank'
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
    <div
      id='right-part-speech'
      className='w-11/12 h-5/6 flex m-10 flex-col overflow-auto items-center no-scrollbar relative'>
      {saveSpeech.map((s, idx) => (
        <div
          id='speech-container'
          className={'w-full h-5/6 flex flex-col mt-5'}>
          <div
            id='speech-bubble'
            className='w-3/4 h-min flex flex-col bg-white rounded-b-lg p-5'>
            <div
              id='speech-bubble-name-container'
              className={
                'w-full mb-2 flex ' +
                (idx % 2 == 0 ? 'justify-start' : 'justify-end')
              }>
              <h3 className='text-lg font-semibold bg-[#4EB0E1] p-1 pl-2 pr-2 rounded-lg w-max text-white'>
                {idx % 2 == 0 ? 'TEMPO' : Auth.user?.name}
              </h3>
            </div>
            <div
              id='speech-bubble-text-container'
              className='w-full flex flex-col relative object-contain'>
              {handleDisplaySavedDialogue(s)}
            </div>
          </div>
        </div>
      ))}
      {loading && (
        <div
          id='speech-container'
          className={'w-full h-5/6 flex flex-col mt-5'}>
          <div
            id='speech-bubble'
            className='w-3/4 h-min flex flex-col bg-white rounded-b-lg p-5'>
            <div
              id='speech-bubble-name-container'
              className={
                'w-full mb-2 flex ' +
                ((dialogueCount) % 2 == 0 ? 'justify-start' : 'justify-end')
              }>
              <h3 className='text-lg font-semibold bg-[#4EB0E1] p-1 pl-2 pr-2 rounded-lg w-max text-white'>
                {(dialogueCount) % 2 == 0 ? 'TEMPO' : Auth.user?.name}
              </h3>
            </div>
            <div
              id='speech-bubble-text-container'
              className='w-full flex flex-col relative object-contain'>
              {(dialogueCount) % 2 == 0 ? 'TEMPO' : Auth.user?.name} is
              writing...
            </div>
          </div>
        </div>
      )}
      {!loading && (
        <div
          id='speech-container'
          className={'w-full h-5/6 flex flex-col mt-5'}>
          <div
            id='speech-bubble'
            className='w-3/4 h-min flex flex-col bg-white rounded-b-lg p-5'>
            <div
              id='speech-bubble-name-container'
              className={
                'w-full mb-2  flex ' +
                (dialogueCount % 2 == 0 ? 'justify-start' : 'justify-end')
              }>
              <h3 className='text-lg font-semibold bg-[#4EB0E1] p-1 pl-2 pr-2 rounded-lg w-max  text-white'>
                {dialogueCount % 2 == 0 ? 'TEMPO' : Auth.user?.name}
              </h3>
            </div>
            <div
              id='speech-bubble-text-container'
              className='w-full flex flex-col relative object-contain'>
              {storyCaseSpeech && handleDisplayDialogue(storyCaseSpeech)}
            </div>
          </div>
        </div>
      )}
      {satisfied === true && (
        <div
          id='button-container'
          className='w-full h-full right-5 bottom-10 z-30 justify-end flex mt-5'>
          <button
            className='beescholar-success-button w-max h-min pr-2 pl-2 pb-1 pt-1 text-center font-bold tracking-widest text-2xl rounded-xl '
            onClick={() => navigate('/game/', { replace: true })}>
            END CASE
          </button>
        </div>
      )}
      {satisfied === false && (
        <div
          id='button-container'
          className=' w-full h-full right-5 bottom-10 z-30 justify-end flex mt-5'>
          <button
            className='beescholar-error-button w-max h-min pr-2 pl-2 pb-1 pt-1 text-center font-bold tracking-widest text-2xl rounded-xl '
            onClick={() => navigate('/game/map')}>
            RETRY CASE
          </button>
        </div>
      )}
    </div>
  );

  const renderBook = () => (
    <div className=' w-5/6 h-5/6 flex flex-row relative justify-center items-center'>
      <div
        id='book-page-left'
        className='bg-white w-1/2 h-full drop-shadow-lg shadow-md shadow-black overflow-auto overflow-x-hidden relative'>
        {renderLeftPart()}
      </div>
      <div className='w-1/6 h-full absolute flex justify-center'>
        <div className='justify-center items-center flex z-10 absolute h-full w-min drop-shadow-lg shadow-md shadow-black'>
          {renderMiddlePart()}
        </div>
      </div>
      <div
        id='book-page-right'
        className=' bg-[#4EB0E1] h-full w-1/2 relative drop-shadow-lg shadow-md shadow-black'>
        {renderRightPart()}
      </div>
    </div>
  );

  return <>{renderBook()}</>;
};

export default StorycaseBook;
