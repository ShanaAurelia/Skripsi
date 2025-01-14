import React, { Component, useEffect, useState } from 'react';
import {
  ICrosswordProps,
  ICrosswordRaw,
  ICrosswordState,
} from './Crossword.interface';
import Crossword, {
  CrosswordGrid,
  CrosswordImperative,
  CrosswordProvider,
  CrosswordProviderImperative,
  DirectionClues,
} from '@jaredreisinger/react-crossword';
import { testCrossword } from '../../constants/crossword.constants';
import { Modal } from '@mui/material';
import '../../constants/global.css';
import './Crossword.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../config/Context';
import axios from 'axios';
import {
  IMinigameData,
  IMinigameHeader,
} from '../../constants/global.interfaces';
import {
  CluesInput,
  CluesInputOriginal,
} from '@jaredreisinger/react-crossword/dist/types';

const CrosswordPage = (props: ICrosswordProps) => {
  // constructor(props: ICrosswordProps) {
  //   super(props);
  //   this.state = {
  //     isCrosswordComplete: false,
  //     isCrosswordCorrect: false,
  //     openModal: false,
  //   };
  // }
  const [isCrosswordComplete, setIsCrosswordComplete] = useState(false);
  const [isCrosswordCorrect, setIsCrosswordCorrect] = useState(false);
  const [minigameData, setMinigameData] = useState<IMinigameHeader>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [rawCrossword, setRawCrossword] = useState<ICrosswordRaw[]>([]);
  const [crosswordData, setCrosswordData] = useState<any>();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const Auth = useAuth();
  const user = Auth.user;
  const { minigameId, nextSceneId } = useParams();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setCrosswordData(handleProcessCrosswordData());
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [rawCrossword]);

  const getData = async () => {
    setIsLoading(true);
    await axios
      .get(`http://127.0.0.1:8000/api/minigame/${minigameId}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => {
        setMinigameData(res.data.message);
        setRawCrossword(res.data.message.words);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  };

  const setCrosswordComplete = async () => {
    if (minigameId !== undefined) {
      let _wordAnswers: any[] = [];
      rawCrossword.forEach((r) => {
        _wordAnswers.push({ wordId: r.wordId, answerText: r.answer });
      });
      const _payload = { minigameId: minigameId, wordAnswers: _wordAnswers };

      await axios
        .post('http://127.0.0.1:8000/api/submit/crossword', _payload, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then((res) => {
          setIsCrosswordComplete(true);
        })
        .catch((err) => {
          alert(err);
          setIsError(true);
        });
    }
  };

  const handleProcessCrosswordData = () => {
    type FormattedData = {
      [key: string]: {
        [key: number]: {
          answer: string;
          clue: string;
          col: number;
          row: number;
        };
      };
    };

    const transformData = (data: ICrosswordRaw[]): FormattedData => {
      const formatted: FormattedData = { across: {}, down: {} };

      data.forEach((item, index) => {
        const key = item.direction === 'horizontal' ? 'across' : 'down';

        formatted[key][index + 1] = {
          answer: item.answer, // Placeholder for answer, update as needed
          clue: item.clue,
          col: item.colStartIdx,
          row: item.rowStartIdx,
        };
      });
      console.log(formatted);
      return formatted;
    };

    return transformData(rawCrossword);
  };

  const handleEndCrossword = () => {
    return navigate(`/game/`, { replace: true });
  };

  const handleRetryCrossword = () => {
    cref.current?.reset();
    setOpenModal(false)
  }

  const cref = React.createRef<CrosswordImperative>();
  return (
    <div
      id='crossword-background'
      className='crossword-background relative'>
      {/* <Crossword data={testCrossword} acrossLabel={"Across Questions"} downLabel={"Down Questions"}/> */}
      <div
        id='crossword-details'
        className='w-3/4 h-5/6 flex flex-row justify-evenly'>
        {!isLoading && (
          <CrosswordProvider
            data={crosswordData}
            ref={cref}
            onCrosswordComplete={(correct) =>
              correct && !isCrosswordComplete ? setCrosswordComplete() : {}
            }>
            <div
              id='crossword'
              className='w-3/4 h-full flex flex-col bg-white p-5 rounded-lg drop-shadow-xl shadow-sm'>
              <div
                id='crossword-container'
                className='w-3/4 h-1/2 flex'>
                <CrosswordGrid />
              </div>
              <div
                id='crossword-buttons'
                className='w-full h-1/2'></div>
              <div
                id='submit-button'
                className=' p-12 flex flex-row justify-evenly'>
                <button
                  className='beescholar-button p-2 pl-3 pr-3 font-semibold text-lg rounded-2xl'
                  onClick={() => {
                    cref.current?.reset();
                    navigate('/game/');
                  }}>
                  Back
                </button>
                <button
                  className='beescholar-button p-2 pl-3 pr-3 font-semibold text-lg rounded-2xl '
                  onClick={() => {
                    setOpenModal(true);
                  }}>
                  Submit
                </button>
              </div>
            </div>
            <div
              id='clues'
              className='flex flex-col justify-normal items-center'>
              <div
                id='across-clues'
                className='clues-class'>
                <h2 className='font-bold text-2xl text-black underline underline-offset-2'>
                  Across Questions
                </h2>
                <DirectionClues
                  direction='across'
                  label={'|'}
                />
              </div>
              <div
                id='down-clues'
                className='clues-class'>
                <h2 className='font-bold text-2xl text-black underline underline-offset-2'>
                  Down Questions
                </h2>
                <DirectionClues
                  direction='down'
                  label={'|'}
                />
              </div>
            </div>
          </CrosswordProvider>
        )}
        {isLoading && <div className='bg-slate-300 animate-pulse w-full h-full'> </div>}
      </div>

      {/* Modal for Correct and Incorrect*/}
      {isCrosswordComplete && (
        <Modal
          open={openModal}
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
                  CROSSWORD COMPLETED
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
                    '/characters/aset merch BINUS Support 3 - bahagia copy.png'
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
                      CROSSWORD RESULTS
                    </h5>
                  </div>
                  <div
                    id='task-modal-description-body'
                    className='w-full h-3/4 pt-3 flex justify-between flex-col'>
                    <>
                      <p className='text-black font-medium tracking-wide text-2xl'>
                        ALL CORRECT ANSWERS
                      </p>
                    </>
                  </div>
                </div>
                <div
                  id='button-container'
                  className='w-full h-max flex justify-end flex-row'>
                  <button
                    id='go-button'
                    className='beescholar-success-button border-2 border-black hover:border-2 rounded-lg p-3 font-bold text-lg tracking-wider  hover:border-black'
                    onClick={() => handleEndCrossword()}>
                    LETS GO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {!isCrosswordComplete && (
        <Modal
          open={openModal}
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
                  CROSSWORD INCOMPLETE
                </h4>
              </div>
              <button
                         id='close-modal-button'
                         className='absolute right-5 top-5 text-4xl text-black bg-white w-20 h-20 2 hover:outline-2 hover:outline hover:outline-black rounded-full'
                         onClick={() => handleRetryCrossword()}>
                         ❌
                       </button>
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
                    '/characters/aset merch BINUS Support 4 - pusing copy.png'
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
                      CROSSWORD FAILED
                    </h5>
                  </div>
                  <div
                    id='task-modal-description-body'
                    className='w-full h-3/4 pt-3 flex justify-between flex-col'>
                    <>
                      <p className='text-black font-medium tracking-wide text-2xl'>
                        YOU HAVE INCORRECT ANSWERS...
                      </p>
                    </>
                  </div>
                </div>
                <div
                  id='button-container'
                  className='w-full h-max flex justify-end flex-row'>
                  {' '}
                  <button
                    id='go-button'
                    className='beescholar-success-button border-2 border-black hover:border-2 rounded-lg p-3 font-bold text-lg tracking-wider  hover:border-black'
                    onClick={() => handleRetryCrossword()}>
                    RETRY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CrosswordPage;
