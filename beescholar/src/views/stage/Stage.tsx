import React, {Component, useState} from "react";
import { ITemplateProps} from "./Stage.interface";
import Stageboard from "../../components/stageboard/Stageboard";

const Stage = () => {
    const [isLoading, setIsLoading] = useState<boolean>();

    const renderLazyLoading = () => <div></div>;
  
    return (
      <div className='h-screen w-full bg-[#014769] items-center flex justify-center'>
        {isLoading ? renderLazyLoading() : <Stageboard/>}
      </div>
    );
}

export default Stage;