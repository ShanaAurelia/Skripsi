import React, { useState, useEffect } from 'react';
import { IDrumPattern, IDrumProps } from './Drum.interface';
import './Drum.css';
import '../../constants/global.css';
import { Modal } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import {
  IMinigameData,
  IMinigameHeader,
} from '../../constants/global.interfaces';
import axios from 'axios';
import { useAuth } from '../../config/Context';
// drum parts: Snare, Hi-Tom, Medium Tom, Floor Tom, Bass Drum, Ride Cymbal, Crash Cymbal, Hi-Hats (pake 5 drum main tanpa cymbal)
/*
    Color Keywords:
    Snare -> orange-300
    Hi-Tom -> blue-400
    Medium Tom -> purple-500
    Floor Tom -> green-700
    Bass Drum -> cyan-700

    pattern: https://www.drumeo.com/beat/13-easy-beginner-drum-beats/
*/

const Drum = () => {
  const [drumPart, setDrumPart] = useState<string[]>([
    'Snare',
    'Hi-Tom',
    'Medium Tom',
    'Floor Tom',
    'Bass Drum',
  ]);
  const [activeDrum, setActiveDrum] = useState<string>('');
  const [patternIndex, setPatternIndex] = useState<number>(0);
  const [hitIndex, setHitIndex] = useState<number>(0);
  const [currentColor, setCurrentColor] = useState<string>('white');
  const [correctHit, setCorrectHit] = useState<number>(0);
  const [falseHit, setFalseHit] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [disableStart, setDisableStart] = useState<boolean>(false);
  const [goRun, setGoRun] = useState<boolean>(false);
  const [disableDrum, setDisableDrum] = useState<boolean>();
  const [colorAnimation, setColorAnimation] = useState('');
  const [colorKey, setColorKey] = useState<number>();
  const [onRetry, setOnRetry] = useState<boolean>(false);
  const [minigameData, setMinigameData] = useState<IMinigameHeader>();
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [drumPattern, setDrumPattern] = useState<string[]>([]);
  const { minigameId, nextSceneId } = useParams();

  const [openReport, setOpenReport] = useState<boolean>(false);
  const [totalPoint, setTotalPoint] = useState<number>(0);
  const [reportStatus, setReportStatus] = useState<string>();
  const [loadingReport, setLoadingReport] = useState<boolean>(false);
  const navigate = useNavigate();
  const Auth = useAuth();
  const user = useAuth().user;

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  useEffect(() => {
    setHitIndex(0);
    setCorrectHit(0);
    setFalseHit(0);
    setDisableStart(false);
    setGoRun(false);
    setCurrentColor('white');
    setPatternIndex(0);
    setDisableDrum(false);
    setColorKey(0);
    setScore(0);
    setOpenReport(false);
    setOnRetry(false);
  }, [onRetry && (correctHit > 0 || falseHit > 0)]);

  useEffect(() => {
    setColorAnimation('animate-ping');
    setTimeout(() => {
      setColorAnimation('');
    }, 300);
  }, [colorKey, disableStart === true]);

  useEffect(() => {
    setScore(calculateScore())
  }, [correctHit, falseHit])

  const getData = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/minigame/${minigameId}`, {
        headers: { Authorization: `Bearer ${user?.token}`, mode: "no-cors" },
      })
      .then((res) => {
        setMinigameData(res.data.message);
        handleCreateRandomPatterns(res.data.message.totalHit);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
    setLoading(false);
  };

  const handleCreateRandomPatterns = (hit: number) => {
    const patterns = ['S', 'HT', 'MT', 'FT', 'BD'];
    const generatedPatterns = Array.from(
      { length: hit },
      () => patterns[Math.floor(Math.random() * patterns.length)]
    );
    setDrumPattern(generatedPatterns);
  };

  const patternColorTranslator = (pattern: string) => {
    if (pattern === 'S') {
      return 'orange-300';
    } else if (pattern === 'HT') {
      return 'blue-400';
    } else if (pattern === 'MT') {
      return 'purple-500';
    } else if (pattern === 'FT') {
      return 'green-700';
    } else if (pattern === 'BD') {
      return 'cyan-700';
    } else {
      return 'white';
    }
  };

  const startPattern = () => {
    if (drumPattern === undefined) return { noPatternModal };
    setGoRun(false);
    var savedI = 0;
    for (var i = 0; i <= patternIndex; i++) {
      const color = patternColorTranslator(drumPattern[i]);
      setTimeout(() => {
        setCurrentColor(color);
        setColorKey(Math.random());
        // console.log('color: (in 1.5s)', color, patternIndex, hitIndex);
      }, (i + 1) * 1000);
      savedI++;
    }
    setDisableStart(true);
    setTimeout(() => {
      setGoRun(true);
    }, (savedI + 1) * 1000);
    setHitIndex(0);
  };

  const handleFinish = () => {
    const _payload = {
      minigameId: minigameId,
      point: calculateScore(),
      patternAnswer: JSON.stringify({ hit: drumPattern }),
    };
    axios
      .post(`http://127.0.0.1:8000/api/submit/drum_puzzle`, _payload, {
        headers: { Authorization: `Bearer ${user?.token}`, mode: "no-cors" },
      })
      .then((res) => {
        setOpenReport(true);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  };

  const handleEndPuzzle = () => {
    Auth.updateUserData();
    return navigate(`/game/story/${nextSceneId}`, { replace: true });
  };

  const validateDrumHit = (drumPart: string) => {
    if (disableStart) {
      if (drumPattern[hitIndex] === drumPart) {
        setCorrectHit(correctHit + 1);
      } else {
        setFalseHit(falseHit + 1);
      }
      // console.log(
      //   'hit: ',
      //   drumPart,
      //   ' pattern: ',
      //   drumPattern.pattern[hitIndex],
      //   ' at ',
      //   hitIndex
      // );
      if (hitIndex >= patternIndex) {
        setPatternIndex(patternIndex + 1);
        setScore(calculateScore());
        setDisableStart(false);
        setGoRun(false);
        setCurrentColor('white');
      } else {
        setHitIndex(hitIndex + 1);
      }
    }
  };

  const calculateScore = () => {
    let additionalVariable:number = 1;
    if(minigameData !== undefined){
      additionalVariable = minigameData.maximumPointReward / (minigameData.totalHit*3)
    }
      const correctHitValue =
        correctHit * additionalVariable;
      const falseHitValue =
        falseHit * additionalVariable;
      const _score = Math.round(correctHitValue - falseHitValue);
      if(_score < 0){
        return 0;
      }else{
        return _score
      }
  };

  const noPatternModal = () => {
    return (
      <Modal open={true}>
        <h2
          id='no-pattern-message'
          className='font-mono text-lg'>
          No Pattern Detected!
        </h2>
      </Modal>
    );
  };

  const openReportModal = () => (
    <Modal
      open={openReport}
      className='w-full h-full flex justify-center items-center'
      disableScrollLock={true}>
      <div
        id='task-modal-container'
        className='w-11/12 h-3/4 bg-[#C06C00] flex flex-col rounded-xl border-black border-4'>
        <div
          id='task-modal-title-container'
          className='flex justify-center items-center w-full h-1/4 relative'>
          <div
            id='task-modal-title-box'
            className='bg-[#F3931B] w-1/2 h-min p-3 rounded-md shadow-xl border-black border-2 absolute -top-10 text-center'>
            <h4 className='text-white font-semibold tracking-widest text-2xl'>
              DRUM PUZZLE {reportStatus?.toUpperCase()}
            </h4>
          </div>
          {/* <button
                  id='close-modal-button'
                  className='absolute right-5 top-5 text-4xl text-black bg-white w-20 h-20 2 hover:outline-2 hover:outline hover:outline-black rounded-full'
                  onClick={() => setOpenReport(false)}>
                  ❌
                </button> */}
        </div>
        <div
          id='task-modal-body-container'
          className='w-full h-1/2 flex flex-row justify-evenly items-center'>
          <div
            id='profiles-picture'
            className=' w-1/4 h-full flex justify-center items-center relative'>
            <div
              id='profiles-squareframe'
              className='bg-white h-5/6 w-1/2 rounded-md border-black border-2 shadow-xl'
            />
            <img
              src={
                (minigameData?.minimumPassingPoint !== undefined &&
                score >= minigameData?.minimumPassingPoint)
                  ? '/characters/aset merch BINUS Support 3 - bahagia copy.png'
                  : '/characters/aset merch BINUS Support 4 - pusing copy.png'
              }
              className='absolute w-full'
            />
          </div>
          <div
            id='task-modal-descriptions-container'
            className='w-1/2 h-full flex flex-col justify-evenly relative'>
            <div
              id='task-modal-descriptions'
              className='w-full h-3/4 bg-white rounded-t-xl shadow-xl border-black border-2 flex-col p-2 '>
              <div
                id='task-modal-description-header'
                className='w-full h-1/4 text-center '>
                <h5 className='text-white bg-[#F3931B] font-semibold tracking-wider text-xl p-2 '>
                  FOLLOW THE DRUM RESULT
                </h5>
              </div>
              {!loadingReport && (
                <div
                  id='task-modal-description-body'
                  className='w-full h-3/4 pt-3 flex justify-between flex-col'>
                  <>
                    <p className='text-black font-medium tracking-wide text-lg'>
                      Correct Hit : {correctHit}
                    </p>
                    <p className='text-black font-medium tracking-wide text-lg'>
                      Incorrect Hit : {falseHit}
                    </p>
                    <p className='text-black font-medium tracking-wide text-2xl'>
                      Points Earned : {score}
                    </p>
                  </>
                </div>
              )}
              {loadingReport && (
                <div
                  id='task-modal-description-body'
                  className='w-full h-3/4 pt-3 flex justify-between flex-col bg-slate-300 animate-pulse'></div>
              )}
            </div>
            <div
              id='button-container'
              className='w-full h-max flex justify-end flex-row'>
              {minigameData?.minimumPassingPoint !== undefined &&
                score >= minigameData?.minimumPassingPoint && (
                  <button
                    id='go-button'
                    className='beescholar-success-button border-2 border-black hover:border-2 rounded-lg p-3 font-bold text-lg tracking-wider  hover:border-black'
                    onClick={() => handleEndPuzzle()}>
                    LETS GO
                  </button>
                )}
              {minigameData?.minimumPassingPoint !== undefined &&
                score < minigameData?.minimumPassingPoint && (
                  <button
                    id='go-button'
                    className='beescholar-success-button border-2 border-black hover:border-2 rounded-lg p-3 font-bold text-lg tracking-wider  hover:border-black'
                    onClick={() => navigate('/game/', { replace: true })}>
                    Back to Homepage
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );

  return (
    <div
      id='drum-set-background'
      className='h-full w-full object-scale-down'>
      <div
        id='status-container'
        className='h-1/4 w-1/4 ml-5 justify-between'>
        <div
          id='score-container'
          className=' bg-white outline-[#81C7E9] outline-4 outline p-5 pl-6 pr-6 rounded-xl w-1/2 grid grid-cols-3 drop-shadow-xl shadow-lg shadow-black'>
          <h1 className='text-black text-xl font-semibold text-wrap text-start'>
            SCORE
          </h1>
          <h1
            id='score-title'
            className='text-black text-xl font-bold text-wrap text-end'>
            {score}
          </h1>
          <h1 className='text-black text-base font-bold text-wrap text-start mt-1'>
            pts
          </h1>
        </div>
      </div>
      <div
        id='pattern-clue-container'
        className='w-full h-1/4 justify-evenly object-center'>
        <div
          id='pattern-clue'
          className={`bg-${currentColor} w-min h-max p-6 rounded-full drop-shadow-xl shadow-lg shadow-black mr-auto ml-auto ${colorAnimation}`}></div>
        <div
          id='start-container'
          className='w-min h-max p-4 mr-auto ml-auto'>
          <button
            className={
              'beescholar-button p-4 pl-5 pr-5 font-semibold drop-shadow-xl shadow-lg shadow-black ' +
              (disableStart ? 'cursor-wait ' : ' ') +
              (goRun ? 'bg-[#76B743]' : ' ')
            }
            onClick={() => {
              patternIndex + 1 > drumPattern.length
                ? handleFinish()
                : startPattern();
            }}>
            {patternIndex + 1 > drumPattern.length
              ? 'Finish'
              : disableStart
              ? goRun
                ? 'Hit'
                : 'Wait'
              : 'Start'}
          </button>
        </div>
      </div>

      {/* Drum Part */}
      <div
        id='drum-set'
        className='flex flex-col justify-evenly h-1/4 w-full bottom-0'>
        <div
          id='upper-drum-set'
          className='drum-part-set mt-5'>
          <button
            id='high-tom'
            className='drum-part bg-blue-400 p-7 disabled:bg-gray-700'
            onClick={() => validateDrumHit('HT')}
            disabled={disableDrum}>
            <h3
              id='high-tom-name'
              className='drum-part-name text-white'>
              High Tom
            </h3>
          </button>
          <button
            id='medium-tom'
            className='drum-part bg-purple-500 p-7 disabled:bg-gray-700'
            onClick={() => validateDrumHit('MT')}
            disabled={disableDrum}>
            <h3
              id='medium-tom-name'
              className='drum-part-name text-white'>
              Medium Tom
            </h3>
          </button>
        </div>
        <div
          id='lower-drum-set'
          className='drum-part-set'>
          <button
            id='snare'
            className='drum-part bg-orange-300 p-9 disabled:bg-gray-700'
            onClick={() => validateDrumHit('S')}
            disabled={disableDrum}>
            <h3
              id='snare-name'
              className='drum-part-name text-white'>
              Snare
            </h3>
          </button>
          <button
            id='bass-drum'
            className='drum-part bg-cyan-700 p-12 disabled:bg-gray-700'
            onClick={() => validateDrumHit('BD')}
            disabled={disableDrum}>
            <h3
              id='bass-drum-name'
              className='drum-part-name text-white'>
              Bass Drum
            </h3>
          </button>
          <button
            id='floor-tom'
            className='drum-part bg-green-700 p-7 disabled:bg-gray-700'
            onClick={() => validateDrumHit('FT')}
            disabled={disableDrum}>
            <h3
              id='floor-tom-name'
              className='drum-part-name text-white'>
              Floor Tom
            </h3>
          </button>
        </div>
      </div>
      {openReport && openReportModal()}
    </div>
  );
};

export default Drum;
