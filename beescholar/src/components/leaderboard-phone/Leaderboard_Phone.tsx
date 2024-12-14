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

  const phoneScreenFill = () => (
    <div
      id='phone-screen-fill'
      className='w-full h-full overflow-auto flex flex-col justify-evenly items-center'>
      <div
        id='global-leaderboard-container'
        className='bg-[#F18700] w-5/6 h-3/4 rounded-md'>
        <div
          id='global-leaderboard-board'
          className='flex flex-row justify-evenly items-center w-full h-full'>
          <div
            id='global-leaderboard-story-clear'
            className='board-global'>
            <div
              id='global-leaderboard-story-title'
              className='flex flex-col h-1/5 w-full items-center mt-2'>
              <h3 className='text-black font-semibold text-md'>TOP 10</h3>
              <h3 className='text-black font-semibold text-md'>
                STORY CLEAR TIME
              </h3>
            </div>
            <div
              id='global-leaderboard-story-ranking'
              className='global-leaderboard-list no-scrollbar'>
              {storyLeaderboard.map((name, index) =>
                index + 1 < 4 ? (
                  <h3 className='global-leaderboard-top-3'>
                    {index + 1} {name}
                  </h3>
                ) : (
                  <h5 className='global-leaderboard-top-10'>
                    {index + 1} {name}
                  </h5>
                )
              )}
            </div>
          </div>
          <div
            id='global-leaderboard-points-clear'
            className='board-global'>
            {' '}
            <div
              id='global-leaderboard-story-title'
              className='flex flex-col h-1/5 w-full items-center mt-2'>
              <h3 className='text-black font-semibold text-md'>TOP 10</h3>
              <h3 className='text-black font-semibold text-md text-center'>
                BEESCHOLAR POINTS
              </h3>
            </div>
            <div
              id='global-leaderboard-story-ranking'
              className='global-leaderboard-list no-scrollbar'>
              {pointLeaderboard.map((name, index) =>
                index + 1 < 4 ? (
                  <h3 className='global-leaderboard-top-3'>
                    {index + 1} {name}
                  </h3>
                ) : (
                  <h5 className='global-leaderboard-top-10'>
                    {index + 1} {name}
                  </h5>
                )
              )}
            </div>
          </div>
          {/* <div
            id='global-leaderboard-crossword-clear'
            className='board-global'>
            {' '}
            <div
              id='global-leaderboard-story-title'
              className='flex flex-col h-1/5 w-full items-center mb-2'>
              <h3 className='text-black font-semibold text-md'>TOP 10</h3>
              <h3 className='text-black font-semibold text-md'>
                CROSSWORD CLEARED
              </h3>
            </div>
            <div
              id='global-leaderboard-story-ranking'
              className='global-leaderboard-list no-scrollbar'>
              {crosswordLeaderboard.map((name, index) =>
                index + 1 < 4 ? (
                  <h3 className='global-leaderboard-top-3'>
                    {index + 1}. {name}
                  </h3>
                ) : (
                  <h5 className='global-leaderboard-top-10'>
                    {index + 1}. {name}
                  </h5>
                )
              )}
            </div>
          </div> */}
        </div>
      </div>
      <div
        id='player-leaderboard-container'
        className='bg-[#F18700] w-5/6 h-1/6 rounded-md'>
        <div
          id='player-leaderboard-board'
          className='flex flex-row justify-evenly items-center w-full h-full'>
          <div
            id='player-leaderboard-story-clear'
            className='board-player'>
            <div
              id='player-rank-story'
              className='w-5/6 h-3/4 rounded-xl bg-[#67BBE7] flex justify-center items-center'>
              <h5 className='text-white font-medium text-lg'>
                {playerStoryLeaderboard?.rank}. {playerStoryLeaderboard?.name}
              </h5>
            </div>
          </div>
          <div
            id='player-leaderboard-points-clear'
            className='board-player'>
            <div
              id='player-rank-points'
              className='w-5/6 h-3/4 rounded-xl bg-[#67BBE7] flex justify-center items-center'>
              <h5 className='text-white font-medium text-lg'>
                {playerPointLeaderboard?.rank} {playerPointLeaderboard?.name}
              </h5>
            </div>
          </div>
          {/* <div
            id='player-leaderboard-crossword-clear'
            className='board-player'>
            <div
              id='player-rank-crossword'
              className='w-5/6 h-3/4 rounded-xl bg-[#67BBE7] flex justify-center items-center'>
              <h5 className='text-white font-medium text-lg'>
                {playerCrosswordLeaderboard?.rank}.{' '}
                {playerCrosswordLeaderboard?.name}
              </h5>
            </div>
          </div> */}
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
        className='bg-white shadow-black shadow-inner rounded-md w-10/12 h-5/6 relative'>
        {phoneScreenFill()}
      </div>
      <div
        id='phone-button-container'
        className='w-1/12 h-full flex justify-center items-center'>
        <button
          id='phone-button'
          className='bg-white w-12 h-12 rounded-full'
          onClick={() => navigate('/game/', {replace:true})}
          >

        </button>
      </div>
    </div>
  );
};

export default Phoneboard;
