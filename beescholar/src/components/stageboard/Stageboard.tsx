import React, { useEffect, useRef, useState } from 'react';
import {
  IMultipleChoice,
  IReordering,
  IStageData,
  IYesOrNo,
} from './Stageboard.interface';
import { DummyStage } from '../../constants/dummy.constants';
import { useNavigate, useParams } from 'react-router-dom';
import '../../constants/global.css';
import {
  IMinigameHeader,
  IQuizChoiceAnswers,
  IQuizQuestion,
  IQuizSteps,
  IStepChoiceAnswers,
} from '../../constants/global.interfaces';
import axios from 'axios';
import { Modal } from '@mui/material';
import { StageTutorialData } from '../../constants/Tutorial.constants';
import { ITutorialData } from '../tutorial/Tutorial.interface';
import { useAuth } from '../../config/Context';

const Stageboard = () => {
  // for stage
  const [minigameData, setMinigameData] = useState<IMinigameHeader>();
  const [openTutorialModal, setOpenTutorialModal] = useState<boolean>(true);
  const [stageData, setStageData] = useState<IQuizQuestion[]>([]);
  const [activeNumber, setActiveNumber] = useState<number>(0);
  const [answeredNumber, setAnsweredNumber] = useState<number[]>([]);
  const [nonstepAnswers, setNonstepAnswers] = useState<IQuizChoiceAnswers[]>(
    []
  );
  const [stepAnswers, setStepAnswers] = useState<IStepChoiceAnswers[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [tryRefresh, setTryRefresh] = useState<boolean>(false);
  const [allAnswered, setAllAnswered] = useState<boolean>(false);
  // for multiple-choice
  const [mcanswerKey, setmcAnswerKey] = useState<number>();
  // for re-ordering
  const [reorders, setReorders] = useState<IQuizSteps[]>([]); // ex: answer1 answer2 answer3
  const [stepNumber, setStepNumbers] = useState<string[]>([]);
  const [rrasnwerKey, setrrAnswerKey] = useState<number>();
  // for yes-or-no
  const [ynanswerKey, setynAnswerKey] = useState<number>();
  // for report
  const [openReport, setOpenReport] = useState<boolean>();
  const [loadingReport, setLoadingReport] = useState<boolean>(false);
  const [totalCorrect, setTotalCorrect] = useState<number>();
  const [totalIncorrect, setTotalIncorrect] = useState<number>();
  const [totalPoint, setTotalPoint] = useState<number>();
  const [status, setStatus] = useState<string>();
  const { minigameId, nextSceneId } = useParams();
  // for tutorial
  const [activeTutorialData, setActiveTutorialData] = useState<ITutorialData>(
    StageTutorialData[0]
  );
  const tutorialData = StageTutorialData;

  const navigate = useNavigate();
  const user = useAuth().user;

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);

  useEffect(() => {
    if (stageData !== undefined && !isLoadingQuestions) {
      setStepNumbers([]);
      if (stageData[activeNumber].questionType === 'Reorder Steps') {
        let _savedAnswer = stepAnswers.findIndex(
          (ans) => ans.questionOrder === activeNumber + 1
        );
        if (_savedAnswer !== -1) {
          // setStepNumbers([]);
          setStepNumbers(stepAnswers[_savedAnswer].stepIds);
        }
      }
    }
  }, [activeNumber]);

  useEffect(() => {
    if (stageData !== undefined && !isLoadingQuestions) {
      if (stageData[activeNumber].questionType === 'Reorder Steps') {
        if (stepNumber.length === stageData[activeNumber].steps.length) {
          handleSaveReorder();
        }
      }
    }
  }, [stepNumber]);

  useEffect(() => {
    if (stageData !== undefined) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [stageData]);

  useEffect(() => {
    if (openTutorialModal === false) {
      setIsLoadingQuestions(false);
    }
  }, [openTutorialModal]);

  useEffect(() => {
    if (
      nonstepAnswers.length + stepAnswers.length === stageData?.length &&
      !isLoadingQuestions
    ) {
      setAllAnswered(true);
    } else {
      setAllAnswered(false);
    }
    handleSaveNumber();
  }, [nonstepAnswers, stepAnswers]);

  const getData = async () => {
    await axios
      .get(`http://167.71.207.1/api/minigame/${minigameId}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => {
        setMinigameData(res.data.message);
        setStageData(res.data.message.quizQuestions);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  };

  const handleRenderByType = (type: string) => {
    if (type === 'Multiple Choice') return renderMultipleChoice();
    if (type === 'Reorder Steps') return renderReordering();
    if (type === 'Yes or No') return renderYesOrNo();
    if (type === 'null') return renderAnswerError();
  };

  const handleSaveReorder = () => {
    let _savedAnswer = stepAnswers.findIndex(
      (ans) => ans.questionOrder === activeNumber + 1
    );
    if (stepNumber.length === stageData[activeNumber].steps.length) {
      const _stepAnswer: IStepChoiceAnswers = {
        questionId: stageData[activeNumber].questionId,
        questionOrder: activeNumber + 1,
        stepIds: stepNumber,
      };
      if (stepAnswers.length === 0 && _savedAnswer === -1) {
        setStepAnswers([_stepAnswer]);
      } else if (_savedAnswer === -1) {
        setStepAnswers([...stepAnswers, _stepAnswer]);
      } else {
        let _currentStepAnswers = stepAnswers;
        _currentStepAnswers[_savedAnswer] = _stepAnswer;
        setStepAnswers(_currentStepAnswers);
      }
    }
    if (_savedAnswer !== -1) {
      setStepNumbers(stepAnswers[_savedAnswer].stepIds);
    }
  };

  const handleChoiceByIndex = (idx: number) => {
    return String.fromCharCode(idx + 65).toString();
  };

  const handleAnswerKeys = () => {
    setmcAnswerKey(Math.random);
    // setrrAnswerKey(Math.random);
    setynAnswerKey(Math.random);
  };

  const handleStepNumber = (step: IQuizSteps) => {
    const _stepExisted = stepNumber.findIndex((st) => st === step.stepId);
    if (stepNumber.length === 0 && _stepExisted === -1) {
      setStepNumbers([step.stepId]);
    } else if (_stepExisted === -1) {
      setStepNumbers([...stepNumber, step.stepId]);
    } else {
      let _tempStepNumber = stepNumber;
      const toBePop = stepNumber[_stepExisted];
      _tempStepNumber = _tempStepNumber.filter((s) => s !== toBePop);
      setStepNumbers(_tempStepNumber);
    }
  };

  const handleGetNumber = (stepId: string) => {
    const _stepExisted = stepNumber.findIndex((st) => st === stepId);
    if (_stepExisted === -1) {
      return '';
    } else {
      return _stepExisted + 1;
    }
  };

  const handleQuizAnswer = (answer: IMultipleChoice) => {
    let _savedAnswer = nonstepAnswers.findIndex(
      (ans) => ans.questionOrder === activeNumber + 1
    );
    if (_savedAnswer === -1) {
      const _newAnswer: IQuizChoiceAnswers = {
        questionOrder: activeNumber + 1,
        choiceId: answer.choiceId,
        questionId: stageData[activeNumber].questionId,
      };
      setNonstepAnswers([...nonstepAnswers, _newAnswer]);
    } else {
      const _newAnswer: IQuizChoiceAnswers = {
        questionOrder: activeNumber + 1,
        choiceId: answer.choiceId,
        questionId: stageData[activeNumber].questionId,
      };
      let _currentAnswers = nonstepAnswers;
      _currentAnswers[_savedAnswer] = _newAnswer;
      setNonstepAnswers(_currentAnswers);
    }
    handleAnswerKeys();
  };

  const handleSaveNumber = () => {
    let _savedNumber = answeredNumber.findIndex(
      (num) => num === activeNumber + 1
    );
    if (_savedNumber === -1 && answeredNumber.length === 0) {
      setAnsweredNumber([activeNumber + 1]);
    } else if (_savedNumber === -1) {
      setAnsweredNumber([...answeredNumber, activeNumber + 1]);
    }
  };

  const handleFinishStage = async () => {
    const _payload = {
      minigameId: minigameId,
      quizChoiceAnswers: nonstepAnswers,
      quizStepAnswers: stepAnswers,
    };
    await axios
      .post('http://167.71.207.1/api/submit/quiz', _payload, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => {
        setLoadingReport(true);
        setOpenReport(true);
        const _data = res.data.data;
        setTotalCorrect(_data.totalCorrect);
        setTotalIncorrect(_data.totalIncorrect);
        setStatus(_data.status);
        setTotalPoint(_data.totalPoint);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
    setLoadingReport(false);
  };

  const LoadingSvg = () => (
    <svg
      className='animate-spin h-20 w-20 mr-3 text-gray-500'
      fill='none'
      viewBox='0 0 24 24'>
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'></circle>
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z'></path>
    </svg>
  );

  const renderMultipleChoice = () => (
    <div
      key={'mc-' + activeNumber + '-' + mcanswerKey}
      id='multiple-choice-container'
      className='w-5/6 h-3/4 flex flex-col'>
      {stageData !== undefined &&
        stageData[activeNumber].choices.map((mc, idx: any) => (
          <>
            <div
              id={'mc-' + idx + '-container'}
              className='w-5/6 h-1/5 flex flex-row justify-center items-center'>
              <button
                id={'choice-' + idx}
                onClick={() => {
                  handleQuizAnswer(mc);
                }}
                className={
                  'border-2 p-2 text-center border-black w-10 h-10 flex justify-center items-center rounded-full hover:border-[#F39F33] hover:text-[#F39F33] ' +
                  (nonstepAnswers.find(
                    (ans) =>
                      ans.choiceId === mc.choiceId &&
                      ans.questionOrder === activeNumber + 1
                  )
                    ? 'bg-[#76BF43]'
                    : '')
                }>
                <p className='font-bold text-2xl'>{handleChoiceByIndex(idx)}</p>
              </button>
              <div
                id={'choice-text-' + idx}
                className='w-3/4 h-full flex items-center'>
                <p className='font-semibold text-lg ml-5'>{mc.choiceText}</p>
              </div>
            </div>
          </>
        ))}
    </div>
  );

  const renderAnswerError = () => <></>;

  const renderLazyLoading = () => (
    <>
      <div
        id='loading'
        className='w-full h-full flex flex-col justify-center items-center'>
        {LoadingSvg()}
        <p>Loading...</p>
      </div>
    </>
  );

  const renderYesOrNo = () => (
    <div
      key={'yn-' + activeNumber + '-' + ynanswerKey}
      id='yes-or-no-container'
      className='w-5/6 h-3/4 flex flex-col'>
      {stageData !== undefined && (
        <>
          <div
            id={'mc-yes-container'}
            className='w-5/6 h-1/5 flex flex-row justify-center items-center'>
            <button
              id={'choice-yes'}
              onClick={() => {
                handleQuizAnswer(stageData[activeNumber].choices[0]);
              }}
              className={
                'border-2 p-2 text-center border-black w-10 h-10 flex justify-center items-center rounded-full hover:border-[#F39F33] hover:text-[#F39F33] ' +
                (nonstepAnswers.find(
                  (ans) =>
                    ans.choiceId ===
                      stageData[activeNumber].choices[0].choiceId &&
                    ans.questionOrder === activeNumber + 1
                )
                  ? 'bg-[#76BF43]'
                  : '')
              }>
              <p className='font-bold text-2xl'>{}</p>
            </button>
            <div
              id={'choice-text-yes'}
              className='w-3/4 h-full flex items-center'>
              <p className='font-semibold text-lg ml-5'>
                {stageData[activeNumber].choices[0].choiceText}
              </p>
            </div>
          </div>
          <div
            id={'mc-no-container'}
            className='w-5/6 h-1/5 flex flex-row justify-center items-center'>
            <button
              id={'choice-no'}
              onClick={() => {
                handleQuizAnswer(stageData[activeNumber].choices[1]);
              }}
              className={
                'border-2 p-2 text-center border-black w-10 h-10 flex justify-center items-center rounded-full hover:border-[#F39F33] hover:text-[#F39F33] ' +
                (nonstepAnswers.find(
                  (ans) =>
                    ans.choiceId ===
                      stageData[activeNumber].choices[1].choiceId &&
                    ans.questionOrder === activeNumber + 1
                )
                  ? 'bg-[#76BF43]'
                  : '')
              }>
              <p className='font-bold text-2xl'>{}</p>
            </button>
            <div
              id={'choice-text-no'}
              className='w-3/4 h-full flex items-center'>
              <p className='font-semibold text-lg ml-5'>
                {stageData[activeNumber].choices[1].choiceText}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderReordering = () => (
    <>
      <div
        key={'rr-' + activeNumber + '-' + rrasnwerKey}
        id='reorder-container'
        className='w-5/6 h-3/4 flex flex-col'>
        {stageData !== undefined &&
          stepAnswers.findIndex((s) => s.questionOrder === activeNumber + 1) ===
            -1 &&
          stageData[activeNumber].steps.map((rr, idx: any) => (
            <>
              <div
                id={'mc-' + idx + '-container'}
                className='w-5/6 h-1/5 flex flex-row justify-center items-center'>
                <button
                  id={'choice-' + idx}
                  onClick={() => {
                    handleStepNumber(rr);
                  }}
                  className={
                    'border-2 p-2 text-center border-black w-10 h-10 flex justify-center items-center rounded-full hover:border-[#F39F33] hover:text-[#F39F33] '
                  }>
                  <p className='font-bold text-2xl'>
                    {handleGetNumber(rr.stepId)}
                  </p>
                </button>
                <div
                  id={'choice-text-' + idx}
                  className='w-3/4 h-full flex items-center'>
                  <p className='font-semibold text-lg ml-5'>{rr.stepText}</p>
                </div>
              </div>
            </>
          ))}
        {stageData !== undefined &&
          stepAnswers.findIndex((s) => s.questionOrder === activeNumber + 1) !==
            -1 &&
          stageData[activeNumber].steps.map((rr, idx: any) => (
            <>
              <div
                id={'mc-' + idx + '-container'}
                className='w-5/6 h-1/5 flex flex-row justify-center items-center'>
                <button
                  id={'choice-' + idx}
                  onClick={() => {
                    handleStepNumber(rr);
                  }}
                  className={
                    'border-2 p-2 text-center border-black w-10 h-10 flex justify-center items-center rounded-full hover:border-[#F39F33] hover:text-[#F39F33] '
                  }>
                  <p className='font-bold text-2xl'>
                    {handleGetNumber(rr.stepId)}
                  </p>
                </button>
                <div
                  id={'choice-text-' + idx}
                  className='w-3/4 h-full flex items-center'>
                  <p className='font-semibold text-lg ml-5'>{rr.stepText}</p>
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );

  const handleChangeNumber = (idx: number) => {
    setActiveNumber(idx);
  };

  const renderWhiteboard = () => (
    <div
      id='whiteboard-container'
      className='w-5/6 h-3/4 flex bg-white shadow-inner shadow-black justify-center place-items-center flex-col'>
      {!isLoadingQuestions && stageData !== undefined && (
        <>
          <div
            id='question-container'
            className='w-3/4 h-1/4 flex justify-start items-center'>
            <h3 className='font-bold text-black text-2xl'>
              {stageData[activeNumber].questionTitle}
            </h3>
          </div>
          {handleRenderByType(stageData[activeNumber].questionType || 'null')}
        </>
      )}
      {isLoadingQuestions && renderLazyLoading()}
      {allAnswered && (
        <>
          <button
            className='beescholar-success-button pt-1 pb-1 pl-2 pr-2 text-2xl font-semibold  rounded-md mb-3'
            onClick={() => {
              handleFinishStage();
            }}>
            Finish Stage
          </button>
        </>
      )}
    </div>
  );

  const renderLoadingWhiteboard = () => (
    <div
      id='whiteboard-container'
      className='w-5/6 h-3/4 flex bg-white shadow-inner shadow-black justify-center place-items-center flex-col animate-pulse'>
      {!isLoadingQuestions && activeNumber > -1 && (
        <>
          <div
            id='question-container'
            className='w-3/4 h-1/4 flex justify-start items-center bg-slate-300'>
            <h3 className='font-bold text-black text-2xl'>
              {/* {stageData[activeNumber].questionTitle} */}
            </h3>
          </div>
          {/* {handleRenderByType(stageData[activeNumber].questionType || 'null')} */}
        </>
      )}
      {isLoadingQuestions && renderLazyLoading()}
    </div>
  );

  const renderNumberBoard = () => (
    <div
      id='number-whiteboard'
      className='w-3/4 h-1/6 grid grid-cols-10 justify-center gap-2 bg-white shadow-black rounded-lg shadow-inner drop-shadow-md'>
      {stageData.map((data, idx) => (
        <div
          id='grid-container'
          className='flex justify-center items-center'>
          <button
            id={'number-' + idx + '-container'}
            onClick={() => handleChangeNumber(idx)}
            className={
              'w-12 h-16 border-4 border-black flex justify-center items-center text-black hover:border-[#F39F33] hover:text-[#F39F33] transition-colors delay-150 ' +
              (activeNumber === idx
                ? 'bg-yellow-200'
                : answeredNumber.find((n) => n === idx + 1) !== undefined
                ? 'bg-[#76B743]'
                : '')
            }>
            <h2 className=' font-bold text-2xl text-center'>{idx + 1}</h2>
          </button>
        </div>
      ))}
    </div>
  );

  const renderLoadingNumberBoard = () => (
    <div
      id='number-whiteboard'
      className='w-3/4 h-1/6 grid grid-cols-10 justify-center gap-2 bg-slate-300 shadow-black rounded-lg shadow-inner drop-shadow-md animate-pulse'></div>
  );

  const renderReportBoard = () => (
    <>
      <div
        id='whiteboard-container'
        className='w-5/6 h-3/4 flex bg-white shadow-inner shadow-black justify-center items-center'>
        <div
          id='right-side'
          className='w-1/3 h-full flex flex-col justify-center items-center'>
          <div
            id='title-container'
            className='w-full h-max flex'>
            <h2 className='text-3xl font-bold tracking-widest underline underline-offset-2'>
              STAGE REPORT
            </h2>
          </div>
          <div
            id='report-details'
            className='w-full h-1/2 flex flex-col justify-evenly items-start '>
            <h5 className='text-xl font-semibold tracking-wide'>
              {totalCorrect} Correct Answers
            </h5>
            <h5 className='text-xl font-semibold tracking-wide'>
              {totalIncorrect} Incorrect Answers
            </h5>
          </div>
        </div>
        <div
          id='left-side'
          className='w-1/3 h-full flex flex-col justify-evenly items-center'>
          <div
            id='beescholar-notes'
            className='border-dashed border-2 border-black w-3/4 h-max flex justify-center items-center self-end pl-2 pr-2 pt-1 pb-1'>
            <p className='text-xl font-medium tracking-widest'>
              {status === 'Completed'
                ? 'You have done well. Keep up the good work.'
                : 'Practice more to get the best results!'}
            </p>
          </div>
          <div
            id='score-container'
            className='self-end h-max w-max flex flex-col justify-items-end'>
            <h2 className='font-bold text-3xl tracking-widest h-max w-max'>
              Score
            </h2>
            <div
              id='score-point-container'
              className='border-black border-4 pt-2 pb-2 pl-3 pr-3 flex justify-center items-center'>
              <h5 className='text-2xl font-black tracking-wide'>
                {totalPoint}
              </h5>
              <p className='text-md font-semibold mt-2'>pts</p>
            </div>
          </div>
        </div>
      </div>
      {status === 'Completed' && (
        <button
          className='beescholar-button pl-2 pr-2 pt-1 pb-1  rounded-lg b text-lg font-semibold tracking-wide drop-shadow-lg shadow-sm shadow-black'
          onClick={() =>
            navigate(`/game/story/${nextSceneId}`, { replace: true })
          }>
          Continue
        </button>
      )}
      {status === 'Failed' && (
        <button
          className='beescholar-button pl-2 pr-2 pt-1 pb-1  rounded-lg b text-lg font-semibold tracking-wide drop-shadow-lg shadow-sm shadow-black'
          onClick={() => navigate(`/game/`, { replace: true })}>
          Back to Homepage
        </button>
      )}
    </>
  );

  const renderTutorialModal = () => (
    <Modal
      open={openTutorialModal}
      onClose={() => setOpenTutorialModal(false)}
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
              <button
                className={
                  'p-5 text-xl text-white bg-[#d38621] shadow-lg shadow-black rounded-lg font-bold ' +
                  (activeTutorialData?.title === data.title
                    ? 'border-white border-2'
                    : '')
                }
                onClick={() => setActiveTutorialData(data)}>
                {data.title}
              </button>
            </div>
          ))}
        </div>
        <div
          id='tutorial-information'
          className='h-3/4 col-span-3 grid grid-rows-2 m-7 rounded-xl'>
          {' '}
          <img
            src={activeTutorialData?.image}
            className='row-span-1'
          />
          <p className='text-2xl text-white font-semibold row-span-1'>
            {activeTutorialData?.description}
          </p>
        </div>
      </div>
    </Modal>
  );

  return (
    <>
      {!openReport && !isLoading && !isLoadingQuestions && (
        <div
          id='board-container'
          className='w-full h-full flex flex-col justify-evenly items-center'>
          {renderWhiteboard()}
          {renderNumberBoard()}
        </div>
      )}
      {!openReport && isLoading && (
        <div
          id='board-container'
          className='w-full h-full flex flex-col justify-evenly items-center'>
          {renderLoadingWhiteboard()}
          {renderLoadingNumberBoard()}
        </div>
      )}
      {openReport && (
        <div
          id='board-report-container'
          className='w-full h-full flex flex-col justify-evenly items-center'>
          {renderReportBoard()}
        </div>
      )}
      {openTutorialModal && renderTutorialModal()}
    </>
  );
};

export default Stageboard;
