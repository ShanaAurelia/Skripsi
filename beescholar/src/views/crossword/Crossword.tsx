import React, { Component, useState } from 'react';
import { ICrosswordProps, ICrosswordState } from './Crossword.interface';
import Crossword, {
  CrosswordGrid,
  CrosswordImperative,
  CrosswordProvider,
  CrosswordProviderImperative,
  DirectionClues,
} from '@jaredreisinger/react-crossword';
import { testCrossword } from '../../constants/crossword.constants';
import { Modal } from '@mui/material';
import '../../constants/global.css'
import './Crossword.css';
import { useNavigate } from 'react-router-dom';

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
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const setCrosswordComplete = () => {
    setIsCrosswordComplete(true);
  };

  const cref = React.createRef<CrosswordImperative>();
  return (
    <div
      id='crossword-background'
      className='crossword-background relative'>
      {/* <Crossword data={testCrossword} acrossLabel={"Across Questions"} downLabel={"Down Questions"}/> */}
      <div
        id='crossword-details'
        className='w-3/4 h-5/6 flex flex-row justify-evenly'>
        <CrosswordProvider
          data={testCrossword}
          ref={cref}
          onCrosswordComplete={(correct) =>
            correct && !isCrosswordComplete ? setCrosswordComplete() : {}
          }>
          <div
            id='crossword'
            className='w-3/4 h-full flex flex-col bg-white p-5 rounded-lg drop-shadow-xl shadow-sm'>
            <div
              id='crossword-container'
              className='w-full h-3/4 '>
              <CrosswordGrid />
            </div>
            <div
              id='crossword-buttons'
              className='w-full h-1/2'>
          </div>
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
      </div>

      {/* Modal for Correct and Incorrect*/}
      {isCrosswordComplete && (
        <Modal
          open={openModal}
          onClose={() => {
            navigate('/game/');
          }}>
          <div
            id='modal-correct-background'
            className='h-screen w-screen flex justify-center'>
            <div
              id='modal-correct-crossword'
              className='modal-background'>
              <div id='modal-correct-details'>
                Congratulations, all your answers are correct!
              </div>
              <button
                className='beescholar-success-button'
                onClick={() => {
                  cref.current?.reset();
                  navigate('/game/');
                }}>
                Go Back
              </button>
            </div>
          </div>
        </Modal>
      )}
      {!isCrosswordComplete && (
        <Modal open={openModal}>
          <div
            id='modal-incorrect-background'
            className='h-screen w-screen flex justify-center'>
            <div
              id='modal-incorrect-crossword'
              className='modal-background'>
              <div id='modal-incorrect-details'>
                You have incorrect answers...
              </div>
              <button
                className='beescholar-error-button'
                onClick={() => {
                  cref.current?.reset();
                  setOpenModal(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}>
                Try Again
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CrosswordPage;
