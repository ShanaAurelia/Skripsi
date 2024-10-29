import React, { useState, useEffect } from 'react';
import { IDrumPattern } from './Drum.interface';
import './Drum.css';

const ExamplePattern: IDrumPattern = {
  pattern: ['BD', 'S', 'BD', 'BD'],
};
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

const Drum = () => {
  const [drumPart, setDrumPart] = useState<string[]>([
    'Snare',
    'Hi-Tom',
    'Medium Tom',
    'Floor Tom',
    'Bass Drum',
  ]);
  const [activeDrum, setActiveDrum] = useState<string>('');
  const [pattern, setPattern] = useState<IDrumPattern>();
  const [patternIndex, setPatternIndex] = useState<number>(-1);
  const [currentColor, setCurrentColor] = useState<string>("white");
  const [correctHit, setCorrectHit] = useState<number>(0);
  const [falseHit, setFalseHit] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    setPattern(ExamplePattern);
  }, []);

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
      id='pattern-clue-container' className='w-full h-1/4 justify-center flex'>
        <div id='pattern-clue' className={`bg-${currentColor} w-min h-max p-6 rounded-full`}>

        </div>

      </div>

      {/* Drum Part */}
      <div
        id='drum-set'
        className='flex flex-col justify-evenly h-1/4 w-full bottom-0'>
        <div
          id='upper-drum-set'
          className='drum-part-set mt-5'>
          <div
            id='high-tom'
            className='drum-part bg-blue-400 p-7'>
            <h3
              id='high-tom-name'
              className='drum-part-name text-white'>
              High Tom
            </h3>
          </div>
          <div
            id='medium-tom'
            className='drum-part bg-purple-500 p-7'>
            <h3
              id='medium-tom-name'
              className='drum-part-name text-white'>
              Medium Tom
            </h3>
          </div>
        </div>
        <div
          id='lower-drum-set'
          className='drum-part-set'>
          <div
            id='snare'
            className='drum-part bg-orange-300 p-9'>
            <h3
              id='snare-name'
              className='drum-part-name text-white'>
              Snare
            </h3>
          </div>
          <div
            id='bass-drum'
            className='drum-part bg-cyan-700 p-12'>
            <h3
              id='bass-drum-name'
              className='drum-part-name text-white'>
              Bass Drum
            </h3>
          </div>
          <div
            id='floor-tom'
            className='drum-part bg-green-700 p-7'>
            <h3
              id='floor-tom-name'
              className='drum-part-name text-white'>
              Floor Tom
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drum;
