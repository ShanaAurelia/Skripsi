import React, {Component, useState} from "react";
import { ITemplateProps} from "./Campus_Map.interfaces";
import MapBook from "../../components/map/Map_Book";

const CampusMap = () => {
    const [isLoading, setIsLoading] = useState<boolean>();

    const renderLazyLoading = () => <div></div>;
  
    return (
      <div className='h-screen w-full bg-[#014769] items-center flex justify-center'>
        {isLoading ? renderLazyLoading() : <MapBook key={'profile-book'}/>}
      </div>
    );
}

export default CampusMap;