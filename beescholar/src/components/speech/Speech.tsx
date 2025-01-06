import React, { Component, useState, useEffect } from 'react';
import { ISpeechProps, ISpeechState } from './Speech.interface';
import { TypeAnimation } from 'react-type-animation';
import './Speech.css';
import '../../constants/global.css';

const Speech = (dialogue: ISpeechProps) => {
  // var container = document.querySelector('.text');

  useEffect(() => {
    // init();
    // setTimeout(() => {
      // revealOneCharacter(characters);
    // }, 600);
  }, [dialogue]);

  var characters: any = [];
  var revealedCharacterCount: number = 0;

  // const init = () => {
  //   dialogue.line.split('').forEach((character) => {
  //     var span = document.createElement('span');
  //     span.textContent = character;
  //     if (container !== null) container.appendChild(span);
  //     characters.push({
  //       span: span,
  //       isSpace: character === ' ',
  //       delayAfter: dialogue.speed,
  //       classes: dialogue.class || [],
  //     });
  //   });
  // };

  // const revealOneCharacter = (list: any) => {
  //   var next = list.splice(0, 1)[0];
  //   next.span.classList.add('revealed');
  //   next.classes.forEach((c: any) => {
  //     next.span.classList.add(c);
  //   });
  //   var delay = next.delayAfter;

  //   if (list.length > 0) {
  //     setTimeout(function () {
  //       revealOneCharacter(list);
  //     }, delay * 10);
  //   }
  //   revealedCharacterCount = revealedCharacterCount + 1;
  // };

  return (
    <div
      className='w-full h-full bg-white'
      id='speech-background'>
      {!dialogue.isLoading && (
        <>
          <div
            id='speech-character-name'
            className='bg-orange-300 p-3 rounded-lg h-max -top-10 w-max z-40 absolute font-bold text-3xl text-black'>
            {dialogue.character}
          </div>
          <div
            id='speech-box'
            className='flex flex-row h-full w-full justify-between overflow-auto p-5'>
            <div
              id='text'
              className='text w-5/6 text-xl font-medium text-black'>{dialogue.line}</div>
            <button
              className='beescholar-button h-max p-2 pr-3 pl-3 rounded-xl flex justify-center items-center'
              onClick={dialogue.handleNext}>
              <p className='font-semibold text-2xl text-center'>Next</p>
            </button>
          </div>
        </>
      )}
      {dialogue.isLoading && (
        <>
        <div
            id='speech-character-name'
            className='bg-slate-300 p-3 rounded-lg h-max -top-10 w-max z-40 absolute font-bold text-3xl text-black animate-pulse'>
            {dialogue.character}
          </div>
          <div
            id='speech-box'
            className='flex flex-row h-full w-full justify-between overflow-auto p-5'>
            <div
              id='loading-text'
              className='text w-5/6 text-xl font-medium text-black'>...</div>
            <button
              className='beescholar-button h-max p-2 pr-3 pl-3 rounded-xl flex justify-center items-center'
              onClick={dialogue.handleNext}>
              <p className='font-semibold text-2xl text-center'>Next</p>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Speech;
