import React, {Component} from "react";
import Drum from "../../components/drum/Drum";
import { IDrumPattern } from "../../components/drum/Drum.interface";

const ExamplePattern: IDrumPattern = {
    pattern: ['BD', 'S', 'BD', 'BD'],
    minimumScore: 500,
    isReplayable: true
  };


const FollowTheDrum = () => {

    return(
    <div id="drum-background" className="absolute bg-black h-screen w-full justify-center">
        <img src="/backgrounds/Band-Room.png" className="w-full h-full object-fill opacity-35"/>
        <div id="drum-component" className="absolute h-3/4 bottom-0 w-full">
            <Drum />
        </div>
    </div>
    )
}

export default FollowTheDrum;