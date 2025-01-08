import React, { Component, useEffect, useState } from 'react';
import { ITutorialData, ITutorialProps } from './Tutorial.interface';
import { Modal } from '@mui/material';
import { TutorialData } from '../../constants/Tutorial.constants';
import "../../constants/global.css"

const Tutorial = (props: ITutorialProps) => {
  const [activeData, setActiveData] = useState<ITutorialData>();
  const [tutorialData, setTutorialData] = useState<ITutorialData[]>([]);

  useEffect(() => {
    setTutorialData(TutorialData);
    setActiveData(tutorialData[0]);
  }, []);

  const handleActiveData = (data: ITutorialData) => {
    setActiveData(data);
  };

  return (
    <Modal
      open={props.isOpen}
      onClose={props.closeModal}
      disableScrollLock={true}
      className='w-full h-full flex justify-center items-center'>
      <div
        id='tutorial-container'
        className='w-10/12 h-5/6 grid grid-cols-4 grid-flow-row gap-2 bg-[#C06C00] rounded-xl relative'>
        <div
          id='tutorial-title'
          className=' h-full col-span-1 bg-[#C06C00] border-r-2 border-black justify-center items-center rounded-xl overflow-y-auto overflow-x-hidden'>
          {tutorialData.map((data) => (
            <div className='w-full h-min flex justify-center items-center m-5'>
              <button className={
                'p-5 text-xl text-white bg-[#d38621] shadow-lg shadow-black rounded-lg font-bold ' +
                  (activeData?.title ===
                data.title
                  ? 'border-white border-2'
                  : '')
              } onClick={() => handleActiveData(data)}>
                {data.title}
              </button>
            </div >
          ))}
        </div>
        <div
          id='tutorial-information'
          className='h-3/4 col-span-3 grid grid-rows-2 m-7 rounded-xl' >
          {' '}
          <img
            src={activeData?.image}
            className='row-span-1'
          />
          <p className='text-2xl text-white font-semibold row-span-1'>
            {activeData?.description}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default Tutorial;
