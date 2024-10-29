import React, {Component} from "react";
import Drum from "../../components/drum/Drum";

const FollowTheDrum = () => {

    return(
    <div id="drum-background" className="absolute bg-black h-screen w-full justify-center">
        <img src="/backgrounds/band_room_empty.png" className="w-full h-full object-fill opacity-50"/>
        <div id="drum-component" className="absolute h-3/4 bottom-0 w-full">
            <Drum />
        </div>
    </div>
    )
}

export default FollowTheDrum;