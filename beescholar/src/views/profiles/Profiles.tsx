import React, { useState } from 'react';
import { ITemplateProps } from './Profiles.interface';
import './Profiles.css';

const CharacterProfiles = () => {
  const [activeLocation, setActiveLocation] = useState<string>('KMG');

  const handleNewActiveLocation = (location: string) => {
    setActiveLocation(location);
  };

  const renderBookmark = () => (
    <div
      id='bookmark'
      className='h-full w-14 flex-col justify-items-end '>
      <button
        id='KMG'
        className={
          (activeLocation === 'KMG' ? 'bg-[#81C7E9] ' : '') + 'bookmark-button'
        }
        onClick={() => handleNewActiveLocation('KMG')}>
        <h5 className='bookmark-text'>K M G</h5>
      </button>
      <button
        id='BDG'
        className={
          (activeLocation === 'BDG' ? 'bg-[#81C7E9] ' : '') + 'bookmark-button'
        }
        onClick={() => handleNewActiveLocation('BDG')}>
        <h5 className='bookmark-text'>B D G</h5>
      </button>
      <button
        id='SMG'
        className={
          (activeLocation === 'SMG' ? 'bg-[#81C7E9] ' : '') + 'bookmark-button'
        }
        onClick={() => handleNewActiveLocation('SMG')}>
        <h5 className='bookmark-text'>S M G</h5>
      </button>
      <button
        id='BKS'
        className={
          (activeLocation === 'BKS' ? 'bg-[#81C7E9] ' : '') + 'bookmark-button'
        }
        onClick={() => handleNewActiveLocation('BKS')}>
        <h5 className='bookmark-text'>B K S</h5>
      </button>
      <button
        id='MLG'
        className={
          (activeLocation === 'MLG' ? 'bg-[#81C7E9] ' : '') + 'bookmark-button'
        }
        onClick={() => handleNewActiveLocation('MLG')}>
        <h5 className='bookmark-text'>M L G</h5>
      </button>
      <button
        id='ALS'
        className={
          (activeLocation === 'ALS' ? 'bg-[#81C7E9] ' : '') + 'bookmark-button'
        }
        onClick={() => handleNewActiveLocation('ALS')}>
        <h5 className='bookmark-text'>A L S</h5>
      </button>
    </div>
  );

  const renderMiddlePart = () => (
    <div
      id='book-middle-part'
      className='h-full w-10 flex flex-col justify-evenly items-center z-10 bg-gradient-to-r from-[#81C7E9] to-white'>
      <div
        id='top-pin'
        className='book-pin'>
        <div
          id='top-pin-container'
          className='pins-container'>
          <div
            id='pin'
            className='left-shadow-pin'
          />
          <div
            id='pin'
            className='right-shadow-pin'
          />
        </div>
        <div
          id='top-pin-container'
          className='pins-container'>
          <div
            id='pin'
            className='left-shadow-pin'
          />
          <div
            id='pin'
            className='right-shadow-pin'
          />
        </div>
      </div>
      <div
        id='book-shadow'
        className='absolute z-0 h-full w-0.5 flex justify-center items-center'>
        <div
          id='left-book-shadow'
          className='shadow-[10px_0_20px_1px_black] h-5/6 w-1/2 bg-black'
        />
        <div
          id='right-book-shadow'
          className='shadow-[-10px_0_20px_1px_black] h-5/6 w-1/2 bg-black'
        />
      </div>
      <div
        id='top-pin'
        className='book-pin'>
        <div
          id='top-pin-container'
          className='pins-container'>
          <div
            id='pin'
            className='left-shadow-pin'
          />
          <div
            id='pin'
            className='right-shadow-pin'
          />
        </div>
        <div
          id='top-pin-container'
          className='pins-container'>
          <div
            id='pin'
            className='left-shadow-pin'
          />
          <div
            id='pin'
            className='right-shadow-pin'
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className='h-screen w-screen bg-[#014769] items-center flex justify-center'>
      <div className=' w-5/6 h-5/6 flex flex-row'>
        {renderBookmark()}
        <div
          id='book-page-left'
          className='bg-[#81C7E9] w-1/2 h-full shadow-[1px_0_1px_0_black_inset]'>
            <div className='grid grid-cols-3 gap-3 m-10'>
                <div className={'list-profile'}></div>
                <div className={'list-profile'}></div>
                <div className={'list-profile'}></div>
                <div className={'list-profile'}></div>
                <div className={'list-profile'}></div>
            </div>
          </div>
        {renderMiddlePart()}
        <div
          id='book-page-right'
          className='bg-white h-full w-1/2'></div>
      </div>
    </div>
  );
};

export default CharacterProfiles;
