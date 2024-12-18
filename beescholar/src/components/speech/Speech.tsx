import React, { Component, useState, useEffect } from 'react';
import { ISpeechProps, ISpeechState } from './Speech.interface';
import { TypeAnimation } from 'react-type-animation';
import './Speech.css';
import { Button } from '@mui/material';

const Speech = (dialogue: ISpeechProps) => {
  var container = document.querySelector('.text');

  useEffect(() => {
    init();
    setTimeout(() => {
      revealOneCharacter(characters);
    }, 600);
  }, [dialogue]);

  var characters: any = [];
  var revealedCharacterCount: number = 0;

  const init = () => {
    dialogue.line.split('').forEach((character) => {
      var span = document.createElement('span');
      span.textContent = character;
      if (container !== null) container.appendChild(span);
      characters.push({
        span: span,
        isSpace: character === ' ',
        delayAfter: dialogue.speed,
        classes: dialogue.class || [],
      });
    });
  };

  const revealOneCharacter = (list: any) => {
    var next = list.splice(0, 1)[0];
    next.span.classList.add('revealed');
    next.classes.forEach((c: any) => {
      next.span.classList.add(c);
    });
    var delay = next.delayAfter;

    if (list.length > 0) {
      setTimeout(function () {
        revealOneCharacter(list);
      }, delay * 10);
    }
    revealedCharacterCount = revealedCharacterCount + 1;
  };

  return (
    <div
      className='w-full h-full bg-white'
      id='speech-background'>
      <div
        id='speech-character-name'
        className='bg-orange-300 p-3 rounded-lg h-max -top-10 w-max z-40 absolute font-bold text-3xl text-black'>
        {dialogue.character}
      </div>
      <div
        id='speech-box'
        className=' flex flex-row absolute h-full w-full justify-between overflow-auto'>
        <div
          id='speech-text'
          className='text w-5/6 text-xl font-medium text-black'></div>
        <Button
          className='absolute h-1/6 top-4 right-2 f'
          onClick={dialogue.handleNext}
          variant='contained'>
          <p className='font-bold text-white text-3xl'>Next</p>
        </Button>
      </div>
    </div>
  );
};

export default Speech;
