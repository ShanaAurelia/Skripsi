import React, { Component, useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Button } from '@mui/material';
import { ICharacter } from '../../constants/global.interfaces';
import { ICharacterSceneProps } from './Character.interface';

const Character = (char: ICharacterSceneProps) => {

    const adjustPosition = (position: string) => {
        // if(position === "right") return "ml-auto" // make image stick to the right
        // else return "mr-auto" // make image stick to the left
        return "ml-auto mr-auto"
    }

    return(
        <div id='character' className={'h-full w-full z-20 flex justify-between'}>
            <img src={char.src} className={'bottom-0 justify-end ' + adjustPosition(char.position)}/>
        </div>
    )
}

export default Character;