import React, { useState, useEffect } from 'react';
import './Leaderboard_Phone.css';
import { IRank } from '../../constants/global.interfaces';
import {
  DummyLeaderboardCrossword,
  DummyLeaderboardPoints,
  DummyLeaderboardStory,
  DummyPlayerRank,
} from '../../constants/dummy.constants';
import '../../constants/global.css';
import { useNavigate } from 'react-router-dom';

const Phoneboard = () => {
  const [storyLeaderboard, setStoryLeaderboard] = useState<string[]>([]);
  const [pointLeaderboard, setPointLeaderboard] = useState<string[]>([]);
  const [crosswordLeaderboard, setCrosswordLeaderboard] = useState<string[]>(
    []
  );
  const [playerLeaderboard, setPlayerLeaderboard] = useState<IRank[]>([]);
  const [playerStoryLeaderboard, setPlayerStoryLeaderboard] = useState<IRank>();
  const [playerPointLeaderboard, setPlayerPointLeaderboard] = useState<IRank>();
  const [playerCrosswordLeaderboard, setPlayerCrosswordLeaderboard] =
    useState<IRank>();

  useEffect(() => {
    setStoryLeaderboard(DummyLeaderboardStory);
    setPointLeaderboard(DummyLeaderboardPoints);
    setPlayerLeaderboard(DummyPlayerRank);
    setCrosswordLeaderboard(DummyLeaderboardCrossword);
  }, []);

  useEffect(() => {
    playerLeaderboard.forEach((rank) => {
      switch (rank.leaderboard) {
        case 'story':
          return setPlayerStoryLeaderboard(rank);
        case 'points':
          return setPlayerPointLeaderboard(rank);
        case 'crossword':
          return setPlayerCrosswordLeaderboard(rank);
      }
    });
  }, [playerLeaderboard]);

  const navigate = useNavigate();

  const phoneGlobalLeaderboardHeader = () => (
    <div
      id='leaderboard-header'
      className='w-full h-max grid grid-cols-5 gap-5 bg-[#014769] pl-2 pr-2 rounded-xl'>
      <div
        id='rank-header'
        className='text-white font-semibold text-base'>
        Rank
      </div>
      <div
        id='name-header'
        className='text-white font-semibold text-base col-span-2'>
        Name
      </div>
      <div
        id='date-header'
        className='text-white font-semibold text-base col-span-2'>
        Completed Date
      </div>
    </div>
  );

  const phoneLeaderboardTitleOption = () => (
    <div
      id='phone-leaderboard-options-container'
      className='w-full h-max flex flex-row justify-between items-center mb-3'>
      <h2 className='text-[#0171A9] font-bold text-3xl text-center'>
        Leaderboard
      </h2>
      <div
        id='options-container'
        className='w-2/5 h-full flex flex-row justify-between'>
        <button
          id='refresh-button'
          className='bg-[#F3931B] text-center font-semibold text-white flex justify-between items-center pl-2 pr-2 rounded-lg drop-shadow-sm shadow-sm shadow-black'>
          <p className='text-sm pr-2'>Refresh </p>
          <img
            src='/component-images/Refresh-Icon.svg'
            className='w-3 h-3'
          />{' '}
        </button>
        <button
          id='refresh-button'
          className='bg-[#F3931B] text-center font-semibold text-white flex justify-between items-center pl-2 pr-2 rounded-lg drop-shadow-sm shadow-sm shadow-black'>
          <p className='text-sm pr-2'>Clear Time </p>
          <img
            src='/component-images/Dropdown-Icon.svg'
            className='w-3 h-3'
          />{' '}
        </button>
      </div>
    </div>
  );

  const phoneSelfLeaderboardHeader = () => (
    <div
      id='self-header'
      className='w-full h-full grid grid-cols-1 mb-2'>
      <div
        id='rank-header'
        className='text-white font-semibold text-base col-span-5 bg-[#014769] rounded-xl pl-2 pr-2 '>
        Your Rank
      </div>
    </div>
  );

  const phoneSelfLeaderboardRank = () => (
    <>
      <div
        id='self-rank'
        className='text-black font-semibold text-lg bg-[#67BBE7] rounded-xl pl-2 p-3 relative'>
        399
        <div
          id='self-photo'
          className='w-9 h-9 rounded-full absolute -right-3 top-2 border-2 border-black'>
          <img
            src='https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721433600&semt=ais_user'
            className='rounded-full w-max h-max'
          />
        </div>
      </div>
      <div
        id='self-name'
        className='text-black font-semibold text-lg rounded-xl col-span-2 p-3'>
        John Doe
      </div>
      <div
        id='self-date'
        className='text-[#014769] font-semibold text-lg rounded-xl col-span-2 p-3'>
        24 Feb 2025 23:59
      </div>
    </>
  );

  const phoneGlobalLeaderboardRank = () => <></>;

  const phoneLeaderboardBoard = () => (
    <div
      id='phone-leaderboard-container'
      className='w-full h-full flex flex-col justify-between'>
      {phoneLeaderboardTitleOption()}
      <div
        id='global-leaderboard-container'
        className='w-full h-5/6 flex flex-col items-center justify-center mb-5'>
        {phoneGlobalLeaderboardHeader()}
        <div
          id='rank-container-global'
          className='bg-[#FFFCFC] w-full h-full grid grid-cols-5 gap-2 rounded-xl'>
          {phoneGlobalLeaderboardRank()}
        </div>
      </div>
      <div
        id='self-leaderboard-container'
        className='w-full h-1/6 flex flex-col items-center justify-center'>
        {phoneSelfLeaderboardHeader()}
        <div
          id='rank-container-self'
          className='bg-[#FFFCFC] w-full h-full grid grid-cols-5 gap-2 rounded-xl'>
          {phoneSelfLeaderboardRank()}
        </div>
      </div>
    </div>
  );

  const phoneLeaderboardCardHeader = () => (
    <div id='card-header' className='w-full p-2 h-1/5 z-10'>
      <div
        id='self-information-container'
        className='w-full h-max grid grid-cols-4 grid-rows-2 gap-2 z-10'>
        <div
          id='self-photo-container'
          className=' row-span-2'>
          <img
            src='https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721433600&semt=ais_user'
            className='rounded-full w-14 h-14'
          />
        </div>
        <div
          id='self-name-container'
          className='col-span-3 text-[#014769]'>
          <p className='text-2xl italic font-bold'>John Doe</p>
        </div>
        <div
          id='self-date-container'
          className='col-span-3 text-[#014769] flex flex-row'>
          <img
            src='/component-images/Clock-Icon.svg'
            className='w-4 h-4 mr-1'
          />{' '}
          <p className='text-xs'>Completed on 24 Feb 2024</p>
        </div>
      </div>
      <div id='candidate-point-container' className='bg-[#014769] w-full h-max z-10 rounded-2xl'>
        <h2 className='text-white font-bold text-base text-center '>15000 Candidate Points</h2>
      </div>
    </div >
  );

  const phoneLeaderboardCardBody = () => (
  <div id='card-body-container' className='w-11/12 z-10 h-3/5 drop-shadow-lg shadow-sm shadow-black bg-white mb-5 rounded-xl flex justify-center items-start'>
    <div id='information-grid' className='w-5/6 h-max grid grid-cols-1 grid-flow-row mt-6 gap-2'>
    <div id='quest-done-grid' className='grid grid-cols-5'>
      <h4 className='self-card-activity'>Quest Done</h4>
      <h4 className='self-card-nonactivity'>:</h4>
      <h4 className='self-card-nonactivity'>3/17</h4>
    </div>
    <div id='activity-done-grid' className='grid grid-cols-5'>
      <h4 className='self-card-activity'>Story Activity Done</h4>
      <h4 className='self-card-nonactivity'>:</h4>
      <h4 className='self-card-nonactivity'>3/17</h4>
    </div>
    <div id='crossword-done-grid' className='grid grid-cols-5'>
      <h4 className='self-card-activity'>Crossword Done</h4>
      <h4 className='self-card-nonactivity'>:</h4>
      <h4 className='self-card-nonactivity'>3/17</h4>
    </div>
    <div id='task-done-grid' className='grid grid-cols-5'>
      <h4 className='self-card-activity'>Trivial Task Done</h4>
      <h4 className='self-card-nonactivity'>:</h4>
      <h4 className='self-card-nonactivity'>3/17</h4>
    </div>
    <div id='campus-done-grid' className='grid grid-cols-5'>
      <h4 className='self-card-activity'>Campus Done</h4>
      <h4 className='self-card-nonactivity'>:</h4>
      <h4 className='self-card-nonactivity'>3/17</h4>
    </div>
    </div>
  </div>
);

  const phoneLeaderboardCard = () => (
    <div
      id='card-leaderboard'
      className='bg-[#FFFCFC] w-11/12 h-5/6 drop-shadow-md shadow-sm flex flex-col relative rounded-xl items-center justify-between'>
      <div
        id='background-leaderboard'
        className='bg-[#67BBE7] absolute top-0 w-full h-2/5 rounded-xl z-0'
      />
      {phoneLeaderboardCardHeader()}
      {phoneLeaderboardCardBody()}
    </div>
  );

  const phoneScreenFill = () => (
    <div
      id='phone-fill-container'
      className='w-full h-full flex flex-col p-5 justify-center'>
      <div
        id='phone-navigation-container'
        className='w-full h-max flex justify-start items-start mb-2'>
        <img src='/component-images/Back-Button.svg' />
      </div>
      <div
        id='phone-fill-leaderboard-container'
        className='w-full h-full flex flex-row justify-between'>
        <div
          id='phone-leaderboard-board-container'
          className='w-8/12 h-full mr-5'>
          {phoneLeaderboardBoard()}
        </div>
        <div
          id='phone-leaderboard-card-container'
          className='w-2/6 h-full '>
          {phoneLeaderboardCard()}
        </div>
      </div>
    </div>
  );

  return (
    <div
      id='phone-container'
      className='bg-black w-3/4 h-5/6 shadow-white shadow-inner rounded-xl flex flex-row items-center relative'>
      <div
        id='phone-camera-container'
        className='w-1/12 h-3/4 rounded-xl ml-1 flex justify-center items-center flex-col'>
        <div
          id='phone-camera-one'
          className='bg-[#393939] rounded-full w-8 h-8 mr-5'></div>
        <div
          id='phone-camera-one'
          className='bg-white rounded-full w-5 h-5 mt-4'></div>
      </div>
      <div
        id='phone-screen-container'
        className='bg-[#E8EFF1] shadow-black shadow-inner rounded-md w-10/12 h-5/6 relative'>
        {phoneScreenFill()}
      </div>
      <div
        id='phone-button-container'
        className='w-1/12 h-full flex justify-center items-center'>
        <button
          id='phone-button'
          className='bg-white w-12 h-12 rounded-full'
          onClick={() => navigate('/game/', { replace: true })}></button>
      </div>
    </div>
  );
};

export default Phoneboard;
