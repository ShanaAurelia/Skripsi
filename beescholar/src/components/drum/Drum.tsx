import React, { useState, useEffect } from 'react';
import { IDrumPattern, IDrumProps } from './Drum.interface';
import './Drum.css';
import { Box, Button, Modal } from '@mui/material';
import { redirect, useNavigate } from 'react-router-dom';
// drum parts: Snare, Hi-Tom, Medium Tom, Floor Tom, Bass Drum, Ride Cymbal, Crash Cymbal, Hi-Hats (pake 5 drum main tanpa cymbal)
/*
    Color Keywords:
    Snare -> orange-300
    Hi-Tom -> blue-400
    Medium Tom -> purple-500
    Floor Tom -> green-700
    Bass Drum -> cyan-700

    pattern: https://www.drumeo.com/beat/13-easy-beginner-drum-beats/
*/

const Drum = (props: IDrumProps) => {
  const drumPattern = props.patternSet;

  const [drumPart, setDrumPart] = useState<string[]>([
    'Snare',
    'Hi-Tom',
    'Medium Tom',
    'Floor Tom',
    'Bass Drum',
  ]);
  const [activeDrum, setActiveDrum] = useState<string>('');
  const [patternIndex, setPatternIndex] = useState<number>(0);
  const [hitIndex, setHitIndex] = useState<number>(0);
  const [currentColor, setCurrentColor] = useState<string>('white');
  const [correctHit, setCorrectHit] = useState<number>(0);
  const [falseHit, setFalseHit] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [disableStart, setDisableStart] = useState<boolean>(false);
  const [disableDrum, setDisableDrum] = useState<boolean>();
  const [colorAnimation, setColorAnimation] = useState('');
  const [colorKey, setColorKey] = useState<number>();
  const [onRetry, setOnRetry] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setHitIndex(0);
    setCorrectHit(0);
    setFalseHit(0);
    setDisableStart(false);
    setCurrentColor('white');
    setPatternIndex(0);
    setDisableDrum(false);
    setColorKey(0);
    setScore(0);
    setOpenModal(false);
    setOnRetry(false);
  }, [onRetry && (correctHit > 0 || falseHit > 0)]);

  useEffect(() => {
    setColorAnimation('animate-ping');
    setTimeout(() => {
      setColorAnimation('');
    }, 300);
  }, [colorKey, disableStart === true]);

  const patternColorTranslator = (pattern: string) => {
    if (pattern === 'S') {
      return 'orange-300';
    } else if (pattern === 'HT') {
      return 'blue-400';
    } else if (pattern === 'MT') {
      return 'purple-500';
    } else if (pattern === 'FT') {
      return 'green-700';
    } else if (pattern === 'BD') {
      return 'cyan-700';
    } else {
      return 'white';
    }
  };

  const startPattern = () => {
    if (drumPattern === undefined) return { noPatternModal };
    for (var i = 0; i <= patternIndex; i++) {
      const color = patternColorTranslator(drumPattern.pattern[i]);
      setTimeout(() => {
        setCurrentColor(color);
        setColorKey(Math.random());
        // console.log('color: (in 1.5s)', color, patternIndex, hitIndex);
      }, (i + 1) * 1000);
    }
    setDisableStart(true);
    setHitIndex(0);
  };

  const validateDrumHit = (drumPart: string) => {
    if (disableStart) {
      if (drumPattern.pattern[hitIndex] === drumPart) {
        setCorrectHit(correctHit + 1);
      } else {
        setFalseHit(falseHit + 1);
      }
      console.log(
        'hit: ',
        drumPart,
        ' pattern: ',
        drumPattern.pattern[hitIndex],
        ' at ',
        hitIndex
      );
      if (hitIndex >= patternIndex) {
        setPatternIndex(patternIndex + 1);
        setScore(calculateScore);
        setDisableStart(false);
        setCurrentColor('white');
      } else {
        setHitIndex(hitIndex + 1);
      }
    }
  };

  const calculateScore = () => {
    const correctHitValue = correctHit * 100;
    const falseHitValue = falseHit * 75;
    console.log('score: ', correctHitValue - falseHitValue);
    return correctHitValue - falseHitValue;
  };

  const noPatternModal = () => {
    return (
      <Modal open={true}>
        <h2
          id='no-pattern-message'
          className='font-mono text-lg'>
          No Pattern Detected!
        </h2>
      </Modal>
    );
  };

  return (
    <div
      id='drum-set-background'
      className='h-full w-full object-scale-down'>
      <div
        id='status-container'
        className='h-1/4 w-max ml-5 justify-between'>
        <div
          id='score-container'
          className=' outline-double outline-amber-600 outline-4 outline-offset-4'>
          <h1
            id='score-title'
            className='text-amber-500 text-xl font-mono font-bold text-wrap'>
            Score {score}
          </h1>
        </div>
      </div>
      <div
        id='pattern-clue-container'
        className='w-full h-1/4 justify-evenly object-center'>
        <div
          id='pattern-clue'
          className={`bg-${currentColor} w-min h-max p-6 rounded-full mr-auto ml-auto ${colorAnimation}`}></div>
        <div
          id='start-container'
          className='w-min h-max p-4 mr-auto ml-auto'>
          {!disableStart && (
            <button
              className='bg-orange-300 outline outline-2 outline-offset-2 outline-orange-300 p-2'
              onClick={() => {
                patternIndex + 1 > drumPattern.pattern.length
                  ? setOpenModal(true)
                  : startPattern();
              }}>
              {patternIndex + 1 > drumPattern.pattern.length
                ? 'Finish'
                : 'Start'}
            </button>
          )}
        </div>
      </div>

      {/* Drum Part */}
      <div
        id='drum-set'
        className='flex flex-col justify-evenly h-1/4 w-full bottom-0'>
        <div
          id='upper-drum-set'
          className='drum-part-set mt-5'>
          <button
            id='high-tom'
            className='drum-part bg-blue-400 p-7 disabled:bg-gray-700'
            onClick={() => validateDrumHit('HT')}
            disabled={disableDrum}>
            <h3
              id='high-tom-name'
              className='drum-part-name text-white'>
              High Tom
            </h3>
          </button>
          <button
            id='medium-tom'
            className='drum-part bg-purple-500 p-7 disabled:bg-gray-700'
            onClick={() => validateDrumHit('MT')}
            disabled={disableDrum}>
            <h3
              id='medium-tom-name'
              className='drum-part-name text-white'>
              Medium Tom
            </h3>
          </button>
        </div>
        <div
          id='lower-drum-set'
          className='drum-part-set'>
          <button
            id='snare'
            className='drum-part bg-orange-300 p-9 disabled:bg-gray-700'
            onClick={() => validateDrumHit('S')}
            disabled={disableDrum}>
            <h3
              id='snare-name'
              className='drum-part-name text-white'>
              Snare
            </h3>
          </button>
          <button
            id='bass-drum'
            className='drum-part bg-cyan-700 p-12 disabled:bg-gray-700'
            onClick={() => validateDrumHit('BD')}
            disabled={disableDrum}>
            <h3
              id='bass-drum-name'
              className='drum-part-name text-white'>
              Bass Drum
            </h3>
          </button>
          <button
            id='floor-tom'
            className='drum-part bg-green-700 p-7 disabled:bg-gray-700'
            onClick={() => validateDrumHit('FT')}
            disabled={disableDrum}>
            <h3
              id='floor-tom-name'
              className='drum-part-name text-white'>
              Floor Tom
            </h3>
          </button>
        </div>
      </div>
      {openModal && (
        <Modal
          open={openModal}
          onClose={() => navigate('/game/', {replace: true})}>
          <div
            id='modal-container'
            className='absolute bg-black h-screen w-screen justify-evenly flex'>
            <div
              id='modal-body'
              className='modal-background bg-white h-max w-max object-contain'>
              <h2
                id='modal-title'
                className='font-mono text-xl text-center'>
                {score >= drumPattern.minimumScore?"Congratulations!":"Oh No..."}
              </h2>
              <h5
                id='modal-text'
                className='font-sans text-lg text-center'>
                {score >= drumPattern.minimumScore? "You have completed the Minigame!":"Your score is not enough to complete this Minigame"}
              </h5>
              {score < drumPattern.minimumScore && (<h5
                id='modal-text-minimum'
                className='font-sans text-lg text-center text-red-700'>
                Required Score: {props.patternSet.minimumScore} and above.
              </h5>)}
              <div
                id='modal-score'
                className='bg-amber-400 border border-spacing-1'>
                <h3
                  id='score'
                  className='font-sans text-xl text-center'>
                  Total Score: {score}
                </h3>
              </div>
              <div
                id='ecp-score'
                className='bg-yellow-400 border border-spacing-1'>
                <h3
                  id='ecp-points'
                  className='font-sans text-xl text-center'>
                  Earned Candidate Points: {Math.round(score / 100)}
                </h3>
              </div>
              {score >= drumPattern.minimumScore ? (
                <div
                  id='button-container'
                  className='flex justify-center bottom-0'>
                  <button
                    id='finish-button'
                    className='bg-green-500 button-end'
                    onClick={() => navigate('/game/', {replace: true})}>
                    Finish Minigame
                  </button>
                  <button
                    id='fail-button'
                    className='bg-orange-500 button-end'
                    onClick={() => setOnRetry(true)}>
                    Try Again
                  </button>
                </div>
              ) : (
                <div
                  id='button-container'
                  className='flex justify-center bottom-0'>
                  <button
                    id='fail-button'
                    className='bg-red-500 button-end'
                    onClick={() => {
                      setOnRetry(true);
                    }}>
                    Retry Minigame
                  </button>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Drum;
