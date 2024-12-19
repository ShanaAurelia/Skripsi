import React, { Component, useState } from 'react';
import { IMainpageProps } from './LandingPage.interface';
import { Modal } from '@mui/material';
import { useAuth } from '../../config/Context';
import { useNavigate } from 'react-router-dom';
import '../../constants/global.css';

const Mainpage = (props: IMainpageProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const user = useAuth();
  const navigate = useNavigate();

  const handleStart = () => {
    if (user.user !== undefined) user.start();
    else {
      setIsModalOpen(true);
    }
  };

  return (
    <div
      className='bg-[#81C7E9] h-screen object-bottom flex'
      id='mainpage'>
      <img
        className='h-full w-full object-fill opacity-70'
        src='./backgrounds/dummy-mainpage.png'
      />
      <div className='w-full h-1/4 justify-items-center absolute bottom-0 object-none'>
        <div
          id='start-container'
          className='relative z-10 p-2'>
          <button
            className='beescholar-button pl-5 pr-5 font-semibold text-2xl p-4 text-center align-middle'
            onClick={handleStart}>
            Start
          </button>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className='flex justify-center items-center w-full h-full'>
        <div
          id='modal-container'
          className='bg-white h-1/4 w-1/2 justify-center items-center rounded-lg flex'>
          {' '}
          <h2 className='font-semibold tracking-widest text-2xl'>
            Please Login First!
          </h2>
        </div>
      </Modal>
    </div>
  );
};

export default Mainpage;
