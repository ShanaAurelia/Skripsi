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
import {
  IPersonalStats,
  IPlayerRank,
} from './Leaderboard_Phone.interface';
import axios from 'axios';
import { useAuth } from '../../config/Context';

const Phoneboard = () => {
  const [storyLeaderboard, setStoryLeaderboard] = useState<IPlayerRank[]>([]);
  const [pointLeaderboard, setPointLeaderboard] = useState<IPlayerRank[]>([]);
  const [crosswordLeaderboard, setCrosswordLeaderboard] = useState<IPlayerRank[]>(
    []
  );
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [currentOption, setCurrentOption] = useState<
    'Clear Time' | 'Crosswords' | 'Total Points'
  >('Clear Time');
  const [isLoadingStats, setIsLoadingStats] = useState<boolean>(false);
  const [isLoadingBoard, setIsLoadingBoard] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [playerStats, setPlayerStats] = useState<IPersonalStats>();
  const [playerStoryLeaderboard, setPlayerStoryLeaderboard] =
    useState<IPlayerRank>();
  const [playerPointLeaderboard, setPlayerPointLeaderboard] =
    useState<IPlayerRank>();
  const [playerCrosswordLeaderboard, setPlayerCrosswordLeaderboard] =
    useState<IPlayerRank>();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [currentOption])

  // useEffect(() => {
  //   playerLeaderboard.forEach((rank) => {
  //     switch (rank.leaderboard) {
  //       case 'story':
  //         return setPlayerStoryLeaderboard(rank);
  //       case 'points':
  //         return setPlayerPointLeaderboard(rank);
  //       case 'crossword':
  //         return setPlayerCrosswordLeaderboard(rank);
  //     }
  //   });
  // }, [playerLeaderboard]);

  const navigate = useNavigate();
  const Auth = useAuth();
  const user = Auth.user;

  const getPlayerStats = () => {
    axios
      .get(`http://127.0.0.1:8000/api/leaderboard/stats/${user?.id}`)
      .then((res) => {
        setPlayerStats(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  };

  const getData = () => {
    setIsLoadingBoard(true);
    handleGetLeaderboard();
    setIsLoadingStats(true);
    getPlayerStats();
    setTimeout(() => {
      setIsLoadingStats(false);
    }, 500);
  };

  const handleRefresh = () => {
    getData();
  };

  const handleChangeDropdown = (
    opt: 'Clear Time' | 'Crosswords' | 'Total Points'
  ) => {
    setCurrentOption(opt);
    setOpenDropdown(false);
  };

  const handleGetLeaderboard = async () => {
    const opt = currentOption;
    switch (opt) {
      case 'Clear Time':
        await axios
          .get(`http://127.0.0.1:8000/api/leaderboard/clear_time/${user?.id}`)
          .then((res) => {
            setStoryLeaderboard(res.data.data.topUsers);
            setPlayerStoryLeaderboard(res.data.data.currentUser);
            setTimeout(() => {
              setIsLoadingBoard(false);
            }, 500);
          })
          .catch((error) => {
            console.log(error);
            setIsError(true);
          });
        return;
      case 'Total Points':
        await axios
          .get(`http://127.0.0.1:8000/api/leaderboard/point/${user?.id}`)
          .then((res) => {
            setPointLeaderboard(res.data.data.topUsers);
            setPlayerPointLeaderboard(res.data.data.currentUser);
            setTimeout(() => {
              setIsLoadingBoard(false);
            }, 500);
          })
          .catch((error) => {
            console.log(error);
            setIsError(true);
          });
        return;
    }
  };

  const handlePlayerBoard = () => {
    const opt = currentOption;
    switch (opt) {
      case 'Clear Time':
        if (playerStoryLeaderboard?.completionDate !== null && playerStoryLeaderboard?.completionDate !== undefined) {
          return playerStoryLeaderboard?.completionDate
        } else {
          return 'No Date Data';
        }
      case 'Crosswords':
        return playerCrosswordLeaderboard?.name.toString();
      case 'Total Points':
        if(playerPointLeaderboard?.totalPoint !== undefined){
          return playerPointLeaderboard?.totalPoint.toString() + "pts";
        }else{
          return "N/A pts"
        }
      default:
        return 'N/A';
    }
  };

  const handlePlayerBoardRank = () => {
    const opt = currentOption;
    switch (opt) {
      case 'Clear Time':
        if (playerStoryLeaderboard?.completionDate !== null && playerStoryLeaderboard?.completionDate !== undefined) {
          return playerStoryLeaderboard.rank;
        } else {
          return 'N/A';
        }
      case 'Crosswords':
        return playerCrosswordLeaderboard?.rank;
      case 'Total Points':
        if(playerPointLeaderboard?.totalPoint !== undefined){
          return playerPointLeaderboard.rank;
        }else{
          return "N/A"
        }
      default:
        return 'N/A';
    }
  };

  const handleGlobalRankData = () => {
    switch(currentOption){
      case "Clear Time":
        return storyLeaderboard.map((data, idx) => phoneGlobalLeaderboardRank(data, idx+1))
      case "Crosswords":
        return crosswordLeaderboard.map((data, idx) => phoneGlobalLeaderboardRank(data, idx+1))
      case "Total Points":
        return pointLeaderboard.map((data, idx) => phoneGlobalLeaderboardRank(data, idx+1))
    }
  }

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
        {currentOption === "Clear Time" && "Completed Date"}
        {currentOption === "Crosswords" && "Crosswords Done"}
        {currentOption === "Total Points" && "Total Points"}
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
          onClick={() => handleRefresh()}
          className='bg-[#F3931B] text-center font-semibold text-white flex justify-between items-center pl-2 pr-2 rounded-lg drop-shadow-sm shadow-sm shadow-black'>
          <p className='text-sm pr-2'>Refresh </p>
          <img
            src='/component-images/Refresh-Icon.svg'
            className='w-3 h-3'
          />{' '}
        </button>
        <div className='h-max flex flex-col relative'>
          <button
            id='stats-button'
            onClick={() => setOpenDropdown(!openDropdown)}
            className='bg-[#F3931B] text-center font-semibold text-white flex justify-between items-center pl-2 pr-2 rounded-lg drop-shadow-sm shadow-sm shadow-black z-20'>
            <p className='text-sm pr-2'>{currentOption}</p>
            <img
              src='/component-images/Dropdown-Icon.svg'
              className='w-3 h-3'
            />{' '}
          </button>
          {openDropdown && (
            <div
              id='dropdown-container'
              className=' w-full bg-[#F3931B] flex-col flex absolute mt-5 p-2 rounded-lg'>
              <button
                id='stats-button'
                onClick={() => handleChangeDropdown('Crosswords')}
                className='bg-white text-center font-semibold text-[#F3931B] flex justify-between items-center rounded-lg drop-shadow-sm shadow-sm shadow-black mb-2 pl-1 pr-1'>
                <p className='text-sm'>Crosswords</p>
              </button>
              <button
                id='stats-button'
                onClick={() => handleChangeDropdown('Total Points')}
                className='bg-white text-center font-semibold text-[#F3931B] flex justify-between items-center rounded-lg drop-shadow-sm shadow-sm shadow-black mb-2 pl-1 pr-1'>
                <p className='text-sm'>Total Points</p>
              </button>
              <button
                id='stats-button'
                onClick={() => handleChangeDropdown('Clear Time')}
                className='bg-white text-center font-semibold text-[#F3931B] flex justify-between items-center rounded-lg drop-shadow-sm shadow-sm shadow-black pl-1 pr-1'>
                <p className='text-sm'>Clear Time</p>
              </button>
            </div>
          )}
        </div>
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

  const phoneSelfLeaderboardRank = (playerData: string | undefined, playerRank: number | undefined | "N/A") => (
    <>
      <div
        id='self-rank'
        className='text-black font-semibold text-lg bg-[#67BBE7] rounded-xl pl-2 p-3 relative'>
        {playerRank}
        <div
          id='self-photo'
          className='w-9 h-9 rounded-full absolute -right-3 top-2 border-2 border-black'>
          <img
            src={user?.profilePicture}
            className='rounded-full w-max h-max'
          />
        </div>
      </div>
      <div
        id='self-name'
        className='text-black font-semibold text-lg rounded-xl col-span-2 p-3'>
        {user?.name}
      </div>
      <div
        id='self-date'
        className='text-[#014769] font-semibold text-lg rounded-xl col-span-2 p-3'>
        {playerData}
      </div>
    </>
  );

  const phoneGlobalLeaderboardRank = (playerData: IPlayerRank, rank: number) => (<>
    <div
      id='self-rank'
      className='text-black font-semibold text-lg bg-[#67BBE7] rounded-xl pl-2 p-3 relative'>
      {rank}
      <div
        id='self-photo'
        className='w-9 h-9 rounded-full absolute -right-3 top-2 border-2 border-black'>
        <img
          src={playerData.profilePicture}
          className='rounded-full w-max h-max'
        />
      </div>
    </div>
    <div
      id='self-name'
      className='text-black font-semibold text-lg rounded-xl col-span-2 p-3'>
      {playerData.name}
    </div>
    <div
      id='self-date'
      className='text-[#014769] font-semibold text-lg rounded-xl col-span-2 p-3'>
      {currentOption === "Clear Time" && playerData.completionDate?.toString()}
      {currentOption === "Crosswords" && playerData.crosswordDone}
      {currentOption === "Total Points" && playerData.totalPoint+"pts"}
    </div>
  </>);

  const phoneLoadingPlayerCard = () => (
    <>
      <div
        id='self-rank'
        className='text-black font-semibold text-lg bg-[#67BBE7] rounded-xl pl-2 p-3 relative animate-pulse'>
        <div
          id='self-photo'
          className='w-9 h-9 rounded-full absolute -right-3 top-2 border-2 border-black bg-slate-300 animate-pulse'></div>
      </div>
      <div
        id='self-name'
        className='text-black font-semibold text-lg rounded-xl col-span-2 p-3 bg-slate-300 animate-pulse'></div>
      <div
        id='self-date'
        className='text-[#014769] font-semibold text-lg rounded-xl col-span-2 p-3 bg-slate-300 animate-pulse'></div>
    </>
  );

  const phoneLeaderboardBoard = () => (
    <div
      id='phone-leaderboard-container'
      className='w-full h-full flex flex-col'>
      {phoneLeaderboardTitleOption()}
      <div
        id='global-leaderboard-container'
        className='w-full h-3/6 flex flex-col items-center justify-center mb-5'>
        {phoneGlobalLeaderboardHeader()}
        <div
          id='rank-container-global'
          className='bg-[#FFFCFC] w-full h-5/6 grid grid-cols-5 gap-2 rounded-xl overflow-auto no-scrollbar'>
          {handleGlobalRankData()}
        </div>
      </div>
      <div
        id='self-leaderboard-container'
        className='w-full h-1/6 flex flex-col items-center justify-center'>
        {phoneSelfLeaderboardHeader()}
        <div
          id='rank-container-self'
          className='bg-[#FFFCFC] w-full h-full grid grid-cols-5 gap-2 rounded-xl'>
          {isLoadingBoard
            ? phoneLoadingPlayerCard()
            : phoneSelfLeaderboardRank(handlePlayerBoard(), handlePlayerBoardRank())}
        </div>
      </div>
    </div>
  );

  const phoneLeaderboardCardHeader = () => (
    <div
      id='card-header'
      className='w-full p-2 h-2/5 z-10'>
      <div
        id='self-information-container'
        className='w-full h-5/6 grid grid-cols-4 grid-rows-2 gap-y-10 z-10'>
        <div
          id='self-photo-container'
          className=' row-span-2'>
          <img
            src={user?.profilePicture}
            className='rounded-full w-14 h-14'
          />
        </div>
        <div
          id='self-name-container'
          className='col-span-3 text-[#014769]'>
          <p className='text-2xl italic font-bold'>{user?.name}</p>
        </div>
        <div
          id='self-date-container'
          className='col-span-3 text-[#014769] flex flex-row'>
          <img
            src='/component-images/Clock-Icon.svg'
            className='w-4 h-4 mr-1'
          />
          <p className='text-xs'>
            {' '}
            {playerStats?.completionDate
              ? 'Completed on ' + playerStats?.completionDate?.toString()
              : 'Has yet completed'}
          </p>
        </div>
      </div>
      <div
        id='candidate-point-container'
        className='bg-[#014769] w-full h-max z-10 rounded-2xl'>
        <h2 className='text-white font-bold text-base text-center '>
          {user?.totalPoint} Candidate Points
        </h2>
      </div>
    </div>
  );

  const phoneLeaderboardCardBody = () => (
    <div
      id='card-body-container'
      className='w-11/12 z-10 h-3/5 drop-shadow-lg shadow-sm shadow-black bg-white mb-5 rounded-xl flex justify-center items-start'>
      <div
        id='information-grid'
        className='w-5/6 h-max grid grid-cols-1 grid-flow-row mt-6 gap-2'>
        <div
          id='quest-done-grid'
          className='grid grid-cols-5'>
          <h4 className='self-card-activity'>Quest Done</h4>
          <h4 className='self-card-nonactivity'>:</h4>
          <h4 className='self-card-nonactivity'>
            {playerStats?.questCompleted} / {playerStats?.totalQuest}
          </h4>
        </div>
        <div
          id='activity-done-grid'
          className='grid grid-cols-5'>
          <h4 className='self-card-activity'>Story Activity Done</h4>
          <h4 className='self-card-nonactivity'>:</h4>
          <h4 className='self-card-nonactivity'>
            {playerStats?.activityCompleted} / {playerStats?.totalActivity}
          </h4>
        </div>
        <div
          id='crossword-done-grid'
          className='grid grid-cols-5'>
          <h4 className='self-card-activity'>Crossword Done</h4>
          <h4 className='self-card-nonactivity'>:</h4>
          <h4 className='self-card-nonactivity'>
            {playerStats?.crosswordCompleted} / {playerStats?.totalCrossword}
          </h4>
        </div>
        {/* <div
          id='task-done-grid'
          className='grid grid-cols-5'>
          <h4 className='self-card-activity'>Trivial Task Done</h4>
          <h4 className='self-card-nonactivity'>:</h4>
          <h4 className='self-card-nonactivity'>{playerStats.}/17</h4>
        </div> */}
        <div
          id='campus-done-grid'
          className='grid grid-cols-5'>
          <h4 className='self-card-activity'>Campus Done</h4>
          <h4 className='self-card-nonactivity'>:</h4>
          <h4 className='self-card-nonactivity'>
            {playerStats?.campusUnlocked} / {playerStats?.totalCampus}
          </h4>
        </div>
      </div>
    </div>
  );

  const phoneLoadingLeaderboardCardHeader = () => (
    <div
      id='card-header'
      className='w-full p-2 h-1/5 z-10'>
      <div
        id='self-information-container'
        className='w-full h-max grid grid-cols-4 grid-rows-2 gap-2 z-10'>
        <div
          id='self-photo-container'
          className=' row-span-2 animate-pulse bg-slate-300'></div>
        <div
          id='self-name-container'
          className='col-span-3 text-[#014769] animate-pulse bg-slate-300'>
          <p className='text-2xl italic font-bold'></p>
        </div>
        <div
          id='self-date-container'
          className='col-span-3 text-[#014769] flex flex-row animate-pulse bg-slate-300'>
          <img
            src='/component-images/Clock-Icon.svg'
            className='w-4 h-4 mr-1'
          />{' '}
          <p className='text-xs'></p>
        </div>
      </div>
      <div
        id='candidate-point-container'
        className='bg-[#014769] w-full h-max z-10 rounded-2xl animate-pulse '>
        <h2 className='text-white font-bold text-base text-center '></h2>
      </div>
    </div>
  );

  const phoneLoadingLeaderboardCardBody = () => (
    <div
      id='card-body-container'
      className='w-11/12 z-10 h-3/5 drop-shadow-lg shadow-sm shadow-black bg-white mb-5 rounded-xl flex justify-center items-start'>
      <div
        id='information-grid'
        className='w-5/6 h-max grid grid-cols-1 grid-flow-row mt-6 gap-2'>
        <div
          id='quest-done-grid'
          className='grid grid-cols-5 animate-pulse bg-slate-300'>
          <h4 className='self-card-activity'></h4>
          <h4 className='self-card-nonactivity'></h4>
          <h4 className='self-card-nonactivity'></h4>
        </div>
        <div
          id='activity-done-grid'
          className='grid grid-cols-5 animate-pulse bg-slate-300'>
          <h4 className='self-card-activity'></h4>
          <h4 className='self-card-nonactivity'></h4>
          <h4 className='self-card-nonactivity'></h4>
        </div>
        <div
          id='crossword-done-grid'
          className='grid grid-cols-5 animate-pulse bg-slate-300'>
          <h4 className='self-card-activity'></h4>
          <h4 className='self-card-nonactivity'></h4>
          <h4 className='self-card-nonactivity'></h4>
        </div>
        {/* <div
          id='task-done-grid'
          className='grid grid-cols-5 animate-pulse bg-slate-300'>
          <h4 className='self-card-activity'></h4>
          <h4 className='self-card-nonactivity'></h4>
          <h4 className='self-card-nonactivity'></h4>
        </div> */}
        <div
          id='campus-done-grid'
          className='grid grid-cols-5 animate-pulse bg-slate-300'>
          <h4 className='self-card-activity'></h4>
          <h4 className='self-card-nonactivity'></h4>
          <h4 className='self-card-nonactivity'></h4>
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
        className='bg-[#67BBE7] absolute top-0 w-full h-3/5 rounded-xl z-0'
      />
      {isLoadingStats
        ? phoneLoadingLeaderboardCardHeader()
        : phoneLeaderboardCardHeader()}
      {isLoadingStats
        ? phoneLoadingLeaderboardCardBody()
        : phoneLeaderboardCardBody()}
    </div>
  );

  const phoneScreenFill = () => (
    <div
      id='phone-fill-container'
      className='w-full h-full flex flex-col p-5 justify-center'>
      <div
        id='phone-navigation-container'
        className='w-full h-max flex justify-start items-start mb-2'>
        <button onClick={() => navigate('/game/', { replace: true })}>
          <img src='/component-images/Back-Button.svg' />
        </button>
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
          className='bg-white w-12 h-12 rounded-full'></button>
      </div>
    </div>
  );
};

export default Phoneboard;
