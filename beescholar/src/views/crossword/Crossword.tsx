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
import { Button, Modal } from '@mui/material';
import './Crossword.css';

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

  const setCrosswordComplete = () => {
    setIsCrosswordComplete(true);
  };

  const cref = React.createRef<CrosswordImperative>();
  return (
    <div
      id='crossword-background'
      className='crossword-background'>
      {/* <Crossword data={testCrossword} acrossLabel={"Across Questions"} downLabel={"Down Questions"}/> */}
      <div
        id='crossword-details'
        className=''>
        <CrosswordProvider
          data={testCrossword}
          ref={cref}
          onCrosswordComplete={(correct) =>
            correct && !isCrosswordComplete ? setCrosswordComplete() : {}
          }>
          <div
            id='crossword'
            className='flex-row flex mt-5 ml-3.5 mr-3.5'>
            <CrosswordGrid />
          </div>
          <div
            id='clues'
            className='mt-10 flex flex-col justify-evenly'>
            <div
              id='across-clues'
              className='clues-class'>
              <DirectionClues
                direction='across'
                label={'Across Questions'}
              />
            </div>
            <div
              id='down-clues'
              className='clues-class'>
              <DirectionClues
                direction='down'
                label={'Down Questions'}
              />
            </div>
          </div>
        </CrosswordProvider>
      </div>
      <div
        id='submit-button'
        className=' p-12 flex flex-row justify-evenly'>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            cref.current?.reset();
            window.location.replace('/home');
          }}>
          Home
        </Button>
        <Button
          variant='outlined'
          color='primary'
          onClick={() => {
            setOpenModal(true);
          }}>
          Submit
        </Button>
      </div>

      {/* Modal for Correct and Incorrect*/}
      {isCrosswordComplete && (
        <Modal
          open={openModal}
          onClose={() => {
            window.location.replace('/home');
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
              <Button
                variant='contained'
                color='success'
                onClick={() => {
                  cref.current?.reset();
                  window.location.replace('/home');
                }}>
                Go Back
              </Button>
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
              <Button
                variant='contained'
                color='warning'
                onClick={() => {
                  cref.current?.reset();
                  window.location.replace('/crossword');
                }}>
                Try Again
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CrosswordPage;
