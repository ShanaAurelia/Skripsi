import React, { Component, useState, useEffect } from 'react';
import { ISpeechProps, ISpeechState } from './Speech.interface';
import { TypeAnimation } from 'react-type-animation';
import './Speech.css';
import { Button } from '@mui/material';

// class Speech extends Component<ISpeechProps, ISpeechState>{
//     constructor(props: ISpeechProps){
//         super(props);
//     }

//     render(){
//         const {line, speed} = this.props
//         return(
//             <TypeAnimation
//               sequence={[line]}
//               wrapper='span'
//               speed={speed}
//               style={{ fontSize: '2em', display: 'inline-block' }}
//             />
//         )
//     }
// }

const Speech = (dialogue: ISpeechProps) => {
  var container = document.querySelector('.text');
  useEffect(() => {
    setTimeout(() => {
      revealOneCharacter(characters);
    }, 600);
  }, [dialogue]);

  var speeds = {
    pause: 500, //Higher number = longer delay
    slow: 120,
    normal: 90,
    fast: 40,
    superFast: 10,
  };

  var characters: any = [];

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

  function revealOneCharacter(list: any) {
    var next = list.splice(0, 1)[0];
    next.span.classList.add('revealed');
    next.classes.forEach((c: any) => {
      next.span.classList.add(c);
    });
    var delay = next.delayAfter;

    if (list.length > 0) {
      setTimeout(function () {
        revealOneCharacter(list);
      }, delay*10);
    }
  }

  return (
    <div className='container w-full h-full flex'>
    <div className='text'>
    </div>
      <Button className="absolute h-3" onClick={dialogue.handleNext}>Next</Button>
    </div>
  );
};

export default Speech;
