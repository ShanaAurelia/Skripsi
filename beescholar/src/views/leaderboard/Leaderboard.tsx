import React, {Component, useState} from "react";
import { ITemplateProps} from "./Leaderboard.interfaces";
import Phoneboard from "../../components/leaderboard-phone/Leaderboard_Phone";

const Leaderboard = () => {
    const [isLoading, setIsLoading] = useState<boolean>();
  
    const renderLazyLoading = () => <div></div>;
  
    return (
      <div className='h-screen w-full bg-[#014769] items-center flex justify-center'>
        {isLoading ? renderLazyLoading() : <Phoneboard/>}
      </div>
    );
  };
  
  export default Leaderboard;